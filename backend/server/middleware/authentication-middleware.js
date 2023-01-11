require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../model/User-model");
const { UnaunthenticatedError } = require("../errors/error-index");

const authenticationMiddleware = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) throw new UnaunthenticatedError("Authentication failed");

  const token = authHeader.split(" ")[1];
  if (token === "undefined") throw new UnaunthenticatedError("Authentication failed");

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) throw new Error();

  const user = await userModel.findById(payload.userID).select("-password");

  if (!user) throw new UnaunthenticatedError("Authentication failed, Please create an account first");

  req.user = user;
  next();
};

module.exports = authenticationMiddleware;
