import { useMediaQuery } from "react-responsive";

import Style from "./Register-Form.module.css";

const GenderSelect = (props) => {
  const { handleRegisterChange, genderError } = props;

  // setting desktopVIew which will help us to get the display size
  const View1 = useMediaQuery({ query: "(min-width:539px)" }); // sends true if display size is more than 850px and false otherwise
  const View2 = useMediaQuery({ query: "(min-width:850px)" }); // sends true if display size is more than 850px and false otherwise
  const View3 = useMediaQuery({ query: "(min-width:1170px)" }); // sends true if display size is more than 850px and false otherwise

  return (
    <div className={Style["reg_grid"]} style={{ marginBottom: `${genderError && !View3 ? "70px" : "0"}` }}>
      <label htmlFor="male">
        Male <input type="radio" name="gender" id="male" value="male" onChange={handleRegisterChange} />
      </label>
      <label htmlFor="female">
        Female <input type="radio" name="gender" id="female" value="female" onChange={handleRegisterChange} />
      </label>
      <label htmlFor="custom">
        Custom <input type="radio" name="gender" id="custom" value="custom" onChange={handleRegisterChange} />
      </label>
      {genderError && (
        <div className={!View3 ? Style["input_error"] : `${Style["input_error"]} ${Style["input_error_select_large"]}`}>
          <div className={!View3 ? Style["error_arrow_bottom"] : Style["error_arrow_left"]}></div>
          {genderError}
        </div>
      )}
    </div>
  );
};

export default GenderSelect;
