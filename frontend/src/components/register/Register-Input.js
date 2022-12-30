import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

import Style from "./Register-Input.module.css";

const RegisterInput = (props) => {
  const [field, meta] = useField(props);

  // setting desktopVIew which will help us to get the display size
  const View1 = useMediaQuery({ query: "(min-width:539px)" }); // sends true if display size is more than 850px and false otherwise
  const View2 = useMediaQuery({ query: "(min-width:850px)" }); // sends true if display size is more than 850px and false otherwise
  const View3 = useMediaQuery({ query: "(min-width:1170px)" }); // sends true if display size is more than 850px and false otherwise

  const case1 = View3 && field.name === "firstName";
  const case2 = View3 && field.name === "lastName";

  const errorMessageDiv = (
    <div
      className={View3 ? `${Style["input_error"]} ${Style["input_error_desktop"]}` : Style["input_error"]}
      style={{ transform: "translateY(3px)", left: `${case1 ? "-107%" : case2 ? "107%" : ""}` }}
    >
      <ErrorMessage name={field.name} />
      <div
        className={
          View3 && field.name !== "firstName"
            ? Style["error_arrow_right"]
            : View3 && field.name === "firstName"
            ? Style["error_arrow_left"]
            : Style["error_arrow_bottom"]
        }
      ></div>
    </div>
  );

  return (
    <div className={`${Style["input_wrap"]} ${Style["register_input_wrap"]}`}>
      <input
        className={meta.touched && meta.error ? Style["input_error_border"] : ""}
        {...field}
        {...props}
        style={{
          width: `${
            View1 && (field.name === "firstName" || field.name === "lastName")
              ? "100%"
              : View1 && (field.name === "email" || field.name === "password")
              ? "370px"
              : "300px"
          }`,
        }}
      />
      {meta.touched && meta.error && errorMessageDiv}

      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
};

export default RegisterInput;
