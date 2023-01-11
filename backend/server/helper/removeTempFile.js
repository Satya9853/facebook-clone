const fs = require("fs");

const removeTempFile = (filepath) => {
  fs.unlink(filepath, (error) => {
    if (error) {
      console.log(error);
      throw new Error();
    }
  });
};

module.exports = removeTempFile;
