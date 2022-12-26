const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
    },

    last_name: {
      type: String,
      required: [true, "last name is required"],
    },

    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "E-mail is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u,
        "Please Provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    picture: {
      type: String,
      trim: true,
      default: "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },

    cover: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      required: [true, "gender is required"],
      trim: true,
    },

    b_year: {
      type: Number,
      required: [true, "Birth year required"],
      trim: true,
    },

    b_month: {
      type: Number,
      required: [true, "Birth month is required"],
      trim: true,
    },

    b_day: {
      type: Number,
      required: [true, "Birth day is required"],
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    friends: {
      type: Array,
      default: [],
    },

    following: {
      type: Array,
      default: [],
    },

    followers: {
      type: Array,
      default: [],
    },

    requests: {
      type: Array,
      default: [],
    },

    search: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    details: {
      bio: {
        type: String,
      },

      otherName: {
        type: String,
      },

      job: {
        type: String,
      },

      workplace: {
        type: String,
      },

      highschool: {
        type: String,
      },

      college: {
        type: String,
      },

      currentCity: {
        type: String,
      },

      hometown: {
        type: String,
      },

      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },

      instagram: {
        type: String,
      },
    },

    savedPosts: [
      {
        post: {
          type: mongoose.Types.ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
