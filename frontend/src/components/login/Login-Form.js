import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import LoginInput from "./Login-Input";
import Style from "./Login-Form.module.css";

const LoginFrom = () => {
  // managing states
  const [login, setLogin] = useState({ email: "", password: "" });

  // handle inputs after submit
  const handleLogin = (event) => {
    const { name, value } = event.target;

    setLogin((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // setting login Validaiton Schema using Yup
  const loginValidation = Yup.object({
    email: Yup.string().required("Email is required").email("Please enter a valid email").max(100, "Maximum character reached"),
    password: Yup.string().required("Password is required").min(6, "Password length should be atleast 6 characters"),
  });

  // setting formik component
  const formikHtml = (formik) => {
    return (
      <Form>
        <LoginInput type="text" name="email" placeholder="Email address or Phone Number" onChange={handleLogin} />
        <LoginInput type="password" name="password" placeholder="Password" onChange={handleLogin} bottom={+true} />
        <button type="submit" className="blue_btn">
          Log In
        </button>
      </Form>
    );
  };

  return (
    <div className={Style["login_wrap"]}>
      <div className={Style["login_1"]}>
        {/* Change this Image with ShareBook SVG */}
        <img src="../../icons/facebook.svg" alt="" />
        <span>Sharebook helps you connect and share with the people in your life</span>
      </div>
      <div className={Style["login_2"]}>
        <div className={Style["login_2_wrap"]}>
          <Formik enableReinitialize initialValues={{ email: login.email, password: login.password }} validationSchema={loginValidation}>
            {formikHtml}
          </Formik>
          <Link to="/forgot" className={Style["forgot_password"]}>
            Forgotten Password?
          </Link>
          <div className={Style["sign_splitter"]}></div>
          <button className={`blue_btn ${Style["open_signup"]}`}>Create Account</button>
        </div>
        <Link to="/" className={Style["sign_extra"]}>
          <b>Create a page </b>
          for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
};

export default LoginFrom;
