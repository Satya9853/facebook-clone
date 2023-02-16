const { StatusCodes } = require("http-status-codes");

const { BadRequestError } = require("../errors/error-index");
const uploadToCloudinary = require("../helper/uploadToCloudinary");

const removeTempFile = require("../helper/removeTempFile");
const getFromCloudinary = require("../helper/getFromCloudinary");

exports.uploadImages = async (req, res, next) => {
  const { path } = req.body;
  if (!path) throw new BadRequestError("please provide the path");

  const files = Object.values(req.files).flat();
  const images = [];

  // we cannot use async await inside a  forEach method
  try {
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTempFile(file.tempFilePath);
    }
    res.status(StatusCodes.OK).json({ images, message: "Images uploaded Successfully" });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.listImages = async (req, res, next) => {
  const { path, sort, max } = req.body;
  if (!path) throw new BadRequestError("Please provide a valid path");

  const results = await getFromCloudinary(path, sort, max);

  if (!results) throw new Error();

  res.status(StatusCodes.OK).json(results);
};
