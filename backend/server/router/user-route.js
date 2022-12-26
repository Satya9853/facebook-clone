const { register, activateAccount } = require("../controller/user-controller");

const Route = require("express").Router();

Route.route("/register").post(register);
Route.route("/activate").post(activateAccount);

module.exports = Route;
