import axios from "axios";

const uploadImage = async (formdata, path, token) => {
  try {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/uploadImages`;
    const body = formdata;
    const config = {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(URL, body, config);
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export default uploadImage;
