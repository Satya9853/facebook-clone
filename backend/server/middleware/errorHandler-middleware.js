const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  const customError = {
    message: error.message || "Internal Server Error",
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
