const Route = require("express").Router();

const { uploadImages } = require("../controller/upload-controller");
const authenticationMiddleware = require("../middleware/authentication-middleware");
const ImageUploadMiddleware = require("../middleware/imageUpload-middleware");

Route.route("/uploadImages").post(authenticationMiddleware, ImageUploadMiddleware, uploadImages);

module.exports = Route;
