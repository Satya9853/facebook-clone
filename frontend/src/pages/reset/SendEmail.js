import React from "react";
import { Link } from "react-router-dom";

import Style from "./Reset.module.css";
import axios from "axios";

const SendEmail = ({ userInfo, error, setError, loading, setLoading, setVisible }) => {
  const handleSendEmail = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/sendResetCodeVerification`;
    const body = { email: userInfo.email };
    try {
      setLoading(true);
      const response = await axios.post(URL, body);

      setError("");
      setVisible(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className={`${Style["reset_form"]} ${Style["dynamic_height"]}`}>
      <div className={Style["reset_form_header"]}>Reset Your Password</div>
      <div className={Style["reset_grid"]}>
        <div className={Style["reset_left"]}>
          <div className={Style["reset_form_text"]}>How do you want to recieve the code to reset your password?</div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="email" id="email" checked readOnly />
            <div className={Style["label_col"]}>
              <span>Send Code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        <div className={Style["reset_right"]}>
          <img src={userInfo.picture} alt="user" />
          <span>{userInfo.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className={Style["error_text"]} style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className={Style["reset_form_btns"]}>
        <Link to="/login" className="grey_btn">
          Not You ?
        </Link>
        <button
          className="blue_btn"
          onClick={() => {
            handleSendEmail();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
