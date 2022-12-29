import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import RegisterInput from "./Register-Input";
import Style from "./Register-Form.module.css";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  });

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // setting Array of years, months and days using array_index (current year - index) for select dropdown options
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => currentYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const numberOfDays = new Date(user.bYear, user.bMonth, 0).getDate();
  const days = Array.from(new Array(numberOfDays), (val, index) => 1 + index);

  // Creating register Validation
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
    email: Yup.string()
      .required("You'll need this when you login and if you ever need to reset your password")
      .email("Please provide a valid email address"),
    password: Yup.string()
      .required("Enter combination using numbers, letters, special symbols of atleast 6 characters")
      .min(6, "Password must be of atleast 6 characters")
      .max(30, "Password can't be more than 30 characters"),
  });

  // setting formik  for registation
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
          <div className={Style["reg_grid"]}>
            <select name="bDay" value={user.bDay} onChange={handleRegisterChange}>
              {days.map((day, index) => (
                <option value={day} key={index}>
                  {day}
                </option>
              ))}
            </select>
            <select name="bMonth" value={user.bMonth} onChange={handleRegisterChange}>
              {months.map((month, index) => (
                <option value={month} key={index}>
                  {month}
                </option>
              ))}
            </select>
            <select name="bYear" value={user.bYear} onChange={handleRegisterChange}>
              {years.map((year, index) => (
                <option value={year} key={index}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={Style["reg_col"]}>
          <div className={Style["reg_line_header"]}>
            Gender <i className="info_icon"></i>
          </div>
          <div className={Style["reg_grid"]}>
            <label htmlFor="male">
              Male <input type="radio" name="gender" id="male" value="male" onChange={handleRegisterChange} />
            </label>
            <label htmlFor="female">
              Female <input type="radio" name="gender" id="female" value="female" onChange={handleRegisterChange} />
            </label>
            <label htmlFor="custom">
              Custom <input type="radio" name="gender" id="custom" value="custom" onChange={handleRegisterChange} />
            </label>
          </div>
        </div>
        <div className={Style["reg_infos"]}>
          By clicking Sign Up, you agree to our <span>Terms, Data Policy &nbsp;</span>and <span>Cookie Policy.</span> You may recieve SMS notification
          from us and can opt out at any time.
        </div>
        <div className={Style["reg_btn_wrapper"]}>
          <button className={`blue_btn ${Style["open_signup"]}`}>Sign Up</button>
        </div>
      </Form>
    );
  };

  return (
    <div className="blur">
      <div className={Style["register"]}>
        <div className={Style["register_header"]}>
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik enableReinitialize initialValues={{ ...user }} validationSchema={registerValidation}>
          {formikHtml}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
