require("dotenv").config();
const UserModel = require("../model/User-model");
const { BadRequestError } = require("../errors/bad-request-error");
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

  // generating JWT Token
  const emailVerificationToken = await user.createJWT("30m");

  //Acess Token
  const token = await user.createJWT("7d");

  const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
  sendVerificationEmail(user.email, user.first_name, url);
  res.status(200).json({
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
