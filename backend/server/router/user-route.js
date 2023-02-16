const Route = require("express").Router();

const {
  register,
  activateAccount,
  login,
  resendVerification,
  searchUser,
  resetPasswordCode,
  verifyResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
} = require("../controller/user-controller");

const authenticationMiddleware = require("../middleware/authentication-middleware");

Route.route("/register").post(register);

Route.route("/activate").post(authenticationMiddleware, activateAccount);

Route.route("/login").post(login);

Route.route("/resendVerification").get(authenticationMiddleware, resendVerification);

Route.route("/findUser").post(searchUser);

Route.route("/sendResetCodeVerification").post(resetPasswordCode);

Route.route("/verifyResetCode").post(verifyResetCode);

Route.route("/changePassword").post(changePassword);

Route.route("/getProfile/:username").get(authenticationMiddleware, getProfile);

Route.route("/updateProfilePicture").put(authenticationMiddleware, updateProfilePicture);

module.exports = Route;
