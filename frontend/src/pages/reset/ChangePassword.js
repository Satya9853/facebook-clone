import React from "react";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import ResetInput from "../../components/reset/Reset-Input";

import Style from "./Reset.module.css";
const ChangePassword = ({ password, setPassword, confirmPassword, setConfirmPassword, error, setError, loading, setLoading, userInfo }) => {
  const navigate = useNavigate();

  const validatePassword = Yup.object({
    password: Yup.string()
      .required("Enter combination using numbers, letters, special symbols of atleast 6 characters")
      .min(6, "Password must be of atleast 6 characters")
      .max(30, "Password can't be more than 30 characters"),
    confirmPassword: Yup.string()
      .required("Confirm your new password")
      .oneOf([Yup.ref("password")], "Password does not match")
      .min(6, "Password must be of atleast 6 characters")
      .max(30, "Password can't be more than 30 characters"),
  });

  const handleChangePassword = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/changePassword`;
    const body = { email: userInfo.email, password: password, confirmPassword: confirmPassword };
    try {
      setLoading(true);
      const response = await axios.post(URL, body);
      setError("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className={Style["reset_form"]} style={{ height: "310px" }}>
      <div className={Style["reset_form_header"]}>Change Password</div>
      <div className={Style["reset_form_text"]}>Enter a new password</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validatePassword}
        onSubmit={() => handleChangePassword()}
      >
        {(formik) => (
          <Form>
            <ResetInput type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="New Password" top={1} />
            <ResetInput
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new Password"
              bottom={1}
            />
            {error && <div className={Style["error_text"]}>{error}</div>}
            <div className={Style["reset_form_btns"]}>
              <Link to="/login" className="grey_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
