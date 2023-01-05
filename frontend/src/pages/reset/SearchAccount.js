import React from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import ResetInput from "../../components/reset/Reset-Input";

import Style from "./Reset.module.css";

const SearchAccount = ({ email, setEmail, error, setError, loading, setLoading, setUserInfo, setVisible }) => {
  const validateEmail = Yup.object({
    email: Yup.string().required("Email is required").email("Please enter a valid email").max(100, "Maximum character reached"),
  });

  const handleSearchEmail = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/findUser`;
    const body = { email };
    try {
      setLoading(true);
      const response = await axios.post(URL, body);
      setUserInfo(response.data);
      setError("");
      setVisible(1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className={Style["reset_form"]}>
      <div className={Style["reset_form_header"]}>Find Your Account</div>
      <div className={Style["reset_form_text"]}>please enter your email address or mobile number to search for your account.</div>
      <Formik enableReinitialize initialValues={{ email }} validationSchema={validateEmail} onSubmit={handleSearchEmail}>
        {(formik) => (
          <Form>
            <ResetInput type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email address or Phone number" />
            {error && <div className={Style["error_text"]}>{error}</div>}
            <div className={Style["reset_form_btns"]}>
              <Link to="/login" className="grey_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;
