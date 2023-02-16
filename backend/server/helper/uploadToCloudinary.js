require("dotenv").config();
const cloudinary = require("cloudinary");
const removeTempFile = require("./removeTempFile");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: path }, (error, response) => {
      if (error) {
        console.log(error);
        removeTempFile(file.tempFilePath);
        reject(error);
      } else {
        resolve({ url: response.secure_url });
      }
    });
  });
};

module.exports = uploadToCloudinary;
