const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["profie-picture", "cover-picture", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide the user of this post"],
      ref: "User",
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: mongoose.Types.ObjectId,
          ref: "user",
          required: [true, "Please provide the user of this comment"],
        },
        commentAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
