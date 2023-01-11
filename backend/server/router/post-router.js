const Route = require("express").Router();

const { createPost, getAllPost } = require("../controller/post-controller");

const authenticationMiddleware = require("../middleware/authentication-middleware");

Route.route("/createPost").post(authenticationMiddleware, createPost);
Route.route("/getAllposts").get(authenticationMiddleware, getAllPost);

module.exports = Route;
