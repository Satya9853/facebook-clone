import axios from "axios";

export const createPostRequest = async (type, background, text, images, user, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/createPost`;
  const body = { type, background, text, images, user };
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.post(URL, body, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};
