// environment variable
require("dotenv").config();

require("express-async-errors");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// required packages
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const fileUpload = require("express-fileupload");

// local imports
const connectDB = require("./db/connectDB");
const routeNotFoundMiddleware = require("./middleware/route-not-found-middleware");
const errorHandlerMiddleware = require("./middleware/errorHandler-middleware");

const app = express();

// package middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(fileUpload({ useTempFiles: true }));

// Route Middlewares using dynamically
fs.readdirSync("./router").map((routes) => app.use("/api/v1", require(`./router/${routes}`)));

// error handling middleware and wrong routes handler
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

// starting server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
