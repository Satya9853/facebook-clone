import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DotLoader } from "react-spinners";
import axios from "axios";
import Cookies from "js-cookie";

import { login } from "../../reducers/User-slice";

import LoginInput from "./Login-Input";
import Style from "./Login-Form.module.css";

const LoginFrom = (props) => {
  // managing states
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle inputs after submit
  const handleLogin = (event) => {
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  /// Send Http request
  const sendHttpRequest = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/login`;
    const body = { ...user };
    try {
      setIsLoading(true);
      const response = await axios.post(URL, body);
      const { user } = response.data;
      setIsLoading(false);
      setError("");
      dispatch(login(user));
      Cookies.set("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  /// loginSubmitHandler
  const loginSubmitHandler = (event) => {
    sendHttpRequest();
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
          <Formik enableReinitialize initialValues={{ ...user }} validationSchema={loginValidation} onSubmit={loginSubmitHandler}>
            {formikHtml}
          </Formik>
          <Link to="/reset" className={Style["forgot_password"]}>
            Forgotten Password?
          </Link>
          <DotLoader color="#1876f2" loading={isLoading} size={30} />
          {error && <div className={Style["error_text"]}>{error}</div>}
          <div className={Style["sign_splitter"]}></div>
          <button className={`blue_btn ${Style["open_signup"]}`} onClick={props.handleSetShowRegister}>
            Create Account
          </button>
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
