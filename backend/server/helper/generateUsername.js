const UserModel = require("../model/User-model");

const generateUsername = async (username) => {
  let flag = false;

  do {
    let user = await UserModel.findOne({ username });
    if (user) {
      // generate new username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      flag = true;
    } else {
      flag = false;
    }
  } while (flag);
  return username;
};

module.exports = generateUsername;
