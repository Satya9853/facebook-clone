const cloudinary = require("cloudinary");

const getFromCloudinary = (path, sort_by, max_result) => {
  return new Promise((resolve) => {
    cloudinary.v2.search
      .expression(`${path}`)
      .sort_by("created_at", `${sort_by}`)
      .max_results(max_result)
      .execute()
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        console.log(error.error.message);
      });
  });
};

module.exports = getFromCloudinary;
