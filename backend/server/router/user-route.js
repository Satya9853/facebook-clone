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
  updateCoverPicture,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest,
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

Route.route("/updateCoverPicture").put(authenticationMiddleware, updateCoverPicture);

Route.route("/updateDetails").put(authenticationMiddleware, updateDetails);

Route.route("/addFriend/:id").put(authenticationMiddleware, addFriend);

Route.route("/cancelRequest/:id").put(authenticationMiddleware, cancelRequest);

Route.route("/acceptRequest/:id").put(authenticationMiddleware, acceptRequest);

Route.route("/follow/:id").put(authenticationMiddleware, follow);

Route.route("/unfollow/:id").put(authenticationMiddleware, unfollow);

Route.route("/unfriend/:id").put(authenticationMiddleware, unfriend);

Route.route("/deleteRequest/:id").put(authenticationMiddleware, deleteRequest);

module.exports = Route;
