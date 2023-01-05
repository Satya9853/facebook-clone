import React from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import ResetInput from "../../components/reset/Reset-Input";

import Style from "./Reset.module.css";

const CodeVerification = ({ userInfo, error, setError, loading, setLoading, setVisible, code, setCode }) => {
  const validateCode = Yup.object({
    code: Yup.string().required("Code is required").min(5, "Code must be of 5 characters").max(5, "Code must be of 5 characters"),
  });

  const handleCodeVerification = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/verifyResetCode`;
    const body = { email: userInfo.email, code: code };
    try {
      setLoading(true);
      const response = await axios.post(URL, body);
      setError("");
      setVisible(3);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className={Style["reset_form"]}>
      <div className={Style["reset_form_header"]}>Code Verification</div>
      <div className={Style["reset_form_text"]}>please enter the code that has been sent to your email.</div>
      <Formik enableReinitialize initialValues={{ code }} validationSchema={validateCode} onSubmit={() => handleCodeVerification()}>
        {(formik) => (
          <Form>
            <ResetInput type="text" name="code" onChange={(e) => setCode(e.target.value)} placeholder="Code" />
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

export default CodeVerification;
