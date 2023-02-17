import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DotLoader } from "react-spinners";
import axios from "axios";
import Cookies from "js-cookie";

import { login } from "../../reducers/User-slice";

import RegisterInput from "./Register-Input";
import DateOfBirthSelect from "./DateOfBirth-select";
import GenderSelect from "./Gender-select";
import Style from "./Register-Form.module.css";

const RegisterForm = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
    cover: "",
  });

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  /// sending  http request function  later change  it to a custom hook to remove code duplicacy
  const sendHttpRequest = async () => {
    setIsLoading(true);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/register`;
    const body = { ...user };
    try {
      const response = await axios.post(URL, body);
      const { user, message } = response.data;

      setIsLoading(false);
      setError("");
      setSuccess(message);

      setTimeout(() => {
        dispatch(login(user));
        Cookies.set("user", JSON.stringify(user));
        navigate("/");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setSuccess("");
      setError(error.response.data.error);
    }
  };

  /// handling Register form submit
  const registerSubmitHandler = (event) => {
    const currentDate = new Date();
    const pickedDate = new Date(user.bYear, user.bMonth - 1, user.bDay);
    const atleast14 = new Date(1970 + 14, 0, 1);

    if (currentDate - pickedDate < atleast14) {
      setDateError("it looks like you have entered the wrong date of birth. Please make sure you use your own date of birth.");
    } else if (user.gender === "") {
      setDateError("");
      setGenderError("Please provide your gender");
    } else {
      setDateError("");
      setGenderError("");
      sendHttpRequest();
    }
  };

  /// Creating register Validation
  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required("What's your first name ?")
      .min(2, "First name should be between 2 to 20 characters")
      .max(20, "First name should be between 2 to 20 characters")
      .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Please Provide a Valid First name"),
    lastName: Yup.string()
      .required("What's your last name ?")
      .min(2, "Last name should be between 2 to 20 characters")
      .max(20, "Last name should be between 2 to 20 characters")
      .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Please Provide a Valid last name"),
    email: Yup.string().required("You'll need this when you login and if you ever need to reset your password").email("Please provide a valid email address"),
    password: Yup.string()
      .required("Enter combination using numbers, letters, special symbols of atleast 6 characters")
      .min(6, "Password must be of atleast 6 characters")
      .max(30, "Password can't be more than 30 characters"),
  });

  /// setting formik  for registation
  const formikHtml = () => {
    return (
      <Form className={Style["register_form"]}>
        <div className={Style["reg_line"]}>
          <RegisterInput type="text" placeholder="First Name" name="firstName" onChange={handleRegisterChange} />
          <RegisterInput type="text" placeholder="Last Name" name="lastName" onChange={handleRegisterChange} />
        </div>
        <div className={Style["reg_line"]}>
          <RegisterInput type="text" placeholder="Email address or Mobile number" name="email" onChange={handleRegisterChange} />
        </div>
        <div className={Style["reg_line"]}>
          <RegisterInput type="password" placeholder="New password" name="password" onChange={handleRegisterChange} />
        </div>
        <div className={Style["reg_col"]}>
          <div className={Style["reg_line_header"]}>
            Date of birth <i className="info_icon"></i>
          </div>
          <DateOfBirthSelect bDay={user.bDay} bMonth={user.bMonth} bYear={user.bYear} handleRegisterChange={handleRegisterChange} dateError={dateError} />
        </div>
        <div className={Style["reg_col"]}>
          <div className={Style["reg_line_header"]}>
            Gender <i className="info_icon"></i>
          </div>
          <GenderSelect handleRegisterChange={handleRegisterChange} genderError={genderError} />
        </div>
        <div className={Style["reg_infos"]}>
          By clicking Sign Up, you agree to our <span>Terms, Data Policy &nbsp;</span>and <span>Cookie Policy.</span> You may recieve SMS notification from us and can opt out at
          any time.
        </div>
        <div className={Style["reg_btn_wrapper"]}>
          <button type="submit" className={`blue_btn ${Style["open_signup"]}`}>
            Sign Up
          </button>
        </div>
        <DotLoader color="#1876f2" loading={isLoading} size={30} />
        {error && <div className={Style["error_text"]}>{error}</div>}
        {success && <div className={Style["success_text"]}>{success}</div>}
      </Form>
    );
  };

  return (
    <div className="blur">
      <div className={Style["register"]}>
        <div className={Style["register_header"]}>
          <i className="exit_icon" onClick={props.handleSetShowRegister}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik enableReinitialize initialValues={{ ...user }} validationSchema={registerValidation} onSubmit={registerSubmitHandler}>
          {formikHtml}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
