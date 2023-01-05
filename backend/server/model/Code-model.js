const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Please provide the 5 digit reset code"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user for the code"],
  },
});

module.exports = mongoose.model("Code", codeSchema);
