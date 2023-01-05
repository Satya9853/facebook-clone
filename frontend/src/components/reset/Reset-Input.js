import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

import Style from "./Reset-Input.module.css";

const ResetInput = (props) => {
  const [field, meta] = useField(props);

  // setting desktopVIew which will help us to get the display size
  const view850 = useMediaQuery({ query: "(min-width:850px)" }); // sends true if display size is more than 850px and false otherwise

  const view1050 = useMediaQuery({ query: "(max-width:1050px)" });

  let classes = "";
  if ((view1050 && view850 && field.name === "confirmPassword") || (view1050 && view850 && field.name === "password")) {
    if (props.bottom) {
      classes = `${Style["input_error"]} ${Style["confirm_password_error"]}`;
    } else {
      classes = `${Style["input_error"]} ${Style["input_error_desktop"]} ${Style["new_password_error"]}`;
    }
  } else if (view850) {
    classes = `${Style["input_error"]} ${Style["input_error_desktop"]}`;
  } else {
    classes = Style["input_error"];
  }

  const errorMessageDiv = (
    <div className={classes} style={{ transform: "translateY(3px)" }}>
      <ErrorMessage name={field.name} />
      <div
        className={
          props.bottom
            ? view850
              ? Style["error_arrow_right"]
              : Style["error_arrow_bottom"]
            : view850
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

      {meta.touched && meta.error && <i className="error_icon" style={{ top: `${!props.bottom && !view850 ? "63%" : "15px"}` }}></i>}
    </div>
  );
};

export default ResetInput;
