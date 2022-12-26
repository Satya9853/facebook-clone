require("dotenv").config();
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const UserModel = require("../model/User-model");
const { BadRequestError, NotFoundError, UnaunthenticatedError } = require("../errors/error-index");
const generateUsername = require("../helper/generateUsername");
const { sendVerificationEmail } = require("../helper/mailer");

exports.register = async (req, res, next) => {
  // creating username
  const { first_name, last_name } = req.body;
  let username = (first_name + last_name).replace(/\s/g, "");
  req.body.username = await generateUsername(username);

  // creating new user
  const user = await UserModel.create({ ...req.body });
  if (!user) throw new Error();

  // generating email verification JWT Token
  const emailVerificationToken = await user.createJWT("30m");
  const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
  response = sendVerificationEmail(user.email, user.first_name, url);
  if (response instanceof Error) throw response;

  //Acess Token
  const token = await user.createJWT("7d");

  res.status(StatusCodes.CREATED).json({
    user: {
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      verified: user.verified,
      picture: user.picture,
      message: "Registered Successfully ! Please activate your email to start",
    },
    token,
  });
};

exports.activateAccount = async (req, res, next) => {
  const { token } = req.body;
  const { userID } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UserModel.findById(userID);
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

  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnaunthenticatedError("Invalid Password");

  const token = await user.createJWT("7d");

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      verified: user.verified,
      picture: user.picture,
      message: "Registered Successfully ! Please activate your email to start",
    },
    token,
  });
};
