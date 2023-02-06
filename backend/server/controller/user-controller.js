require("dotenv").config();
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const UserModel = require("../model/User-model");
const CodeModel = require("../model/Code-model");
const PostModel = require("../model/Post-model");
const { sendVerificationEmail, sendVerificationCode } = require("../helper/mailer");
const generateUsername = require("../helper/generateUsername");
const generateCode = require("../helper/generateCode");
const { BadRequestError, NotFoundError, UnaunthenticatedError } = require("../errors/error-index");

exports.register = async (req, res, next) => {
  // creating username
  const { firstName, lastName } = req.body;
  let username = (firstName + lastName).replace(/\s/g, "");
  req.body.username = await generateUsername(username);

  // creating new user
  const user = await UserModel.create({ ...req.body });
  if (!user) throw new Error();

  // generating email verification JWT Token
  const emailVerificationToken = await user.createJWT("30m");
  const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
  response = sendVerificationEmail(user.email, user.firstName, url);
  if (response instanceof Error) throw response;

  //Acess Token
  const token = await user.createJWT("7d");

  res.status(StatusCodes.CREATED).json({
    user: {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      picture: user.picture,
      token,
    },
    message: "Registered Successfully ! Please activate your email to start",
  });
};

exports.activateAccount = async (req, res, next) => {
  const { token } = req.body.token;
  if (!token) throw new BadRequestError("Please provide the token");

  const { userID } = jwt.verify(token, process.env.JWT_SECRET);
  const loggedUser = req.user;

  if (loggedUser._id.toString() !== userID) throw new BadRequestError("You don't have the authorization to complete this operation");

  const user = await UserModel.findById(userID);
  if (!user) throw new UnaunthenticatedError("Invalid user, please create your account first");
  const isVerified = user.verified;
  if (isVerified) throw new BadRequestError(`The Email-Id ${user.email} is already verified`);
  await user.updateOne({ verified: true });

  res.status(StatusCodes.OK).json({ message: `Email-Id ${user.email} has been successfully verified` });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError("Please Provide Email and Password");

  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFoundError(`The email address ${email} is not connected to any account`);

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnaunthenticatedError("The Password you entered is incorrect. Please try again");

  const token = await user.createJWT("7d");

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      picture: user.picture,
      token,
    },
  });
};

exports.resendVerification = async (req, res, next) => {
  const loggedUser = req.user;

  if (loggedUser.verified === true) throw new BadRequestError(`The Email-Id ${user.email} is already verified`);

  const emailVerificationToken = await loggedUser.createJWT("30m");
  const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
  response = sendVerificationEmail(loggedUser.email, loggedUser.firstName, url);
  if (response instanceof Error) throw response;
  res.status(StatusCodes.OK).json({ message: "Email verification link has been sent to your email" });
};

exports.searchUser = async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("Please provide an email");

  const user = await UserModel.findOne({ email }).select("-password");

  if (!user) throw new BadRequestError("Account does not exist ");

  res.status(StatusCodes.OK).json({ email: user.email, picture: user.picture });
};

exports.resetPasswordCode = async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("Please provide an email");

  const user = await UserModel.findOne({ email }).select("-password");
  if (!user) throw new BadRequestError("Account does not exist");

  await CodeModel.findOneAndRemove({ user: user._id });

  const code = generateCode(5);
  if (!code) throw new Error();

  const createdCode = await CodeModel.create({ code, user: user._id });
  if (!createdCode) throw new Error();

  const response = sendVerificationCode(user.email, user.firstName, createdCode.code);
  if (response instanceof Error) throw new Error();

  res.status(StatusCodes.OK).json({ message: "An email verification code has been sent to your email" });
};

exports.verifyResetCode = async (req, res, next) => {
  const { code, email } = req.body;

  if (!code || !email) throw new BadRequestError("Please provide the reset code and email");

  const user = await UserModel.findOne({ email });
  if (!user) throw new BadRequestError("Account does not exist");

  const dbCode = await CodeModel.findOne({ user: user._id });

  console.log(code, dbCode.code);

  if (code !== dbCode.code) throw new BadRequestError("Verification code is wrong");

  res.status(StatusCodes.OK).json({ message: "Verification Code matched" });
};

exports.changePassword = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) throw new BadRequestError("Please provide email, password and confirm Password");

  if (password !== confirmPassword) throw new BadRequestError("Password and confirm Password does not match");

  const user = await UserModel.findOne({ email });
  if (!user) throw new BadRequestError("Account does not exist");
  user.password = password;
  await user.save();

  res.status(StatusCodes.OK).json({ message: "Password has been successfully changed" });
};

exports.getProfile = async (req, res, next) => {
  const { username } = req.params;
  if (!username) throw new BadRequestError("Please provide correct parameters");

  const user = await UserModel.findOne({ username }).select("-password");

  if (!user) return res.status(StatusCodes.OK).json({ ok: false });

  const posts = await PostModel.find({ user: user._id }).populate("user", "firstName lastName username picture gender");

  res.status(StatusCodes.OK).json({ ...user.toObject(), posts });
};
