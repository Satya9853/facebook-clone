const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  const customError = {
    message: error.message || "Internal Server Error",
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (error.code === 11000) {
    if (error.keyPattern._fts === "text") {
      customError.message = `Username ${error.keyValue._fts} already exists, try with different username`;
    }
    if ("email" in error.keyPattern) {
      customError.message = `Email id ${error.keyValue.email} already exists, try with different email id`;
    }
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (error.name === "ValidationError") {
    const fieldName = error.message.split(":")[1].trim();

    if (fieldName === "email") {
      customError.message = error.message.split(":")[2].trim();
    } else if (["bDay", "bMonth", "bYear"].includes(fieldName)) {
      customError.message = error.errors[fieldName].message;
    } else {
      customError.message = `${fieldName} should be of atleast ${error.errors[fieldName].properties.minlength} characters`;
    }
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ error: customError.message });
};

module.exports = errorHandlerMiddleware;
