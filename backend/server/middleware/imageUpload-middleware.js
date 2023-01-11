const { BadRequestError } = require("../errors/error-index");
const removeTempFile = require("../helper/removeTempFile");

const ImageUploadMiddleware = (req, res, next) => {
  if (!req.files || Object.values(req.files).flat().length === 0) throw new BadRequestError("No files were found to upload");

  const files = Object.values(req.files).flat();

  files.forEach((file) => {
    const fileType = file.mimetype.split("/")[0];
    if (fileType !== "image") {
      removeTempFile(file.tempFilePath);
      throw new BadRequestError("Unsupportted file format. please provide an image");
    }

    if (file.size > 1024 * 1024 * 5) {
      removeTempFile(file.tempFilePath);
      throw new BadRequestError("File size is too large");
    }
  });

  next();
};

module.exports = ImageUploadMiddleware;
