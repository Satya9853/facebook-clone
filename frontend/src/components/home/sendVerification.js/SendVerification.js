import React, { useState } from "react";

import Style from "./SendVerification.module.css";
import axios from "axios";

const SendVerification = ({ user }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const sendHttpRequest = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/resendVerification`;
    const config = { headers: { Authorization: `Bearer ${user.user.token}` } };

    try {
      const response = await axios.get(URL, config);
      const { message } = response.data;
      setSuccess(message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className={Style["send_verification"]}>
      <span>Your account is not verified, verify your account before it gets deleted after a month from creating</span>
      <a onClick={sendHttpRequest}>Click here and send verification link</a>
      {success && <div className={Style["success_text"]}>{success}</div>}
      {error && <div className={Style["error_text"]}>{error}</div>}
    </div>
  );
};

export default SendVerification;
