import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

import Style from "./Login-Input.module.css";

const LoginInput = (props) => {
  const [field, meta] = useField(props);

  // setting desktopVIew which will help us to get the display size
  const desktopView = useMediaQuery({ query: "(min-width:850px)" }); // sends true if display size is more than 850px and false otherwise

  const errorMessageDiv = (
    <div
      className={desktopView ? `${Style["input_error"]} ${Style["input_error_desktop"]}` : Style["input_error"]}
      style={{ transform: "translateY(3px)" }}
    >
      <ErrorMessage name={field.name} />
      <div
        className={
          props.bottom
            ? desktopView
              ? Style["error_arrow_right"]
              : Style["error_arrow_bottom"]
            : desktopView
            ? Style["error_arrow_right"]
            : Style["error_arrow_top"]
        }
      ></div>
    </div>
  );

  return (
    <div className={Style["input_wrap"]}>
      {meta.touched && meta.error && !props.bottom && errorMessageDiv}

      <input className={meta.touched && meta.error ? Style["input_error_border"] : ""} {...field} {...props} />

      {meta.touched && meta.error && props.bottom && errorMessageDiv}

      {meta.touched && meta.error && <i className="error_icon" style={{ top: `${!props.bottom && !desktopView ? "63%" : "15px"}` }}></i>}
    </div>
  );
};

export default LoginInput;
