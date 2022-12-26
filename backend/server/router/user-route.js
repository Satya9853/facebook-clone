const { register } = require("../controller/user-controller");

const Route = require("express").Router();

Route.route("/register").post(register);

module.exports = Route;
