const { register, activateAccount, login } = require("../controller/user-controller");

const Route = require("express").Router();

Route.route("/register").post(register);
Route.route("/activate").post(activateAccount);
Route.route("/login").post(login);

module.exports = Route;
