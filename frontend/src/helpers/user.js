import axios from "axios";

export const addFriend = async (id, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, {}, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};

export const cancelRequest = async (id, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, {}, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};

export const follow = async (id, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, {}, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};

export const unfollow = async (id, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, {}, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};

export const acceptRequest = async (id, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, {}, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};

export const unfriend = async (id, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, {}, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};

export const deleteRequest = async (id, token) => {
  const URL = `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    await axios.put(URL, {}, config);
    return "Success";
  } catch (error) {
    return error.response.data.error;
  }
};
