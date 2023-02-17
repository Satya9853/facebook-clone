import axios from "axios";

export const updateImage = async (url, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`;
  const body = { url };
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, body, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};

export const updateCoverPicture = async (url, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/updateCoverPicture`;
  const body = { url };
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, body, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};
