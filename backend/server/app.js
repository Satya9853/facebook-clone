// environment variable
require("dotenv").config();

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// required packages
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// local imports
const connectDB = require("./db/connectDB");
const routeNotFoundMiddleware = require("./middleware/route-not-found-middleware");

const app = express();

// package middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(xss());

// Route Middlewares using dynamically
fs.readdirSync("./router").map((routes) => app.use("/api/v1", require(`./router/${routes}`)));

// error handling middleware
app.use(routeNotFoundMiddleware);

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
