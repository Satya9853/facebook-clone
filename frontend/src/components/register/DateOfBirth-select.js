import { useMediaQuery } from "react-responsive";

import Style from "./Register-Form.module.css";

const DateOfBirthSelect = (props) => {
  const { bDay, bMonth, bYear, handleRegisterChange, dateError } = props;

  // setting desktopVIew which will help us to get the display size
  const View1 = useMediaQuery({ query: "(min-width:539px)" }); // sends true if display size is more than 850px and false otherwise
  const View2 = useMediaQuery({ query: "(min-width:850px)" }); // sends true if display size is more than 850px and false otherwise
  const View3 = useMediaQuery({ query: "(min-width:1170px)" }); // sends true if display size is more than 850px and false otherwise

  // setting Array of years, months and days using array_index (current year - index) for select dropdown options
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => currentYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const numberOfDays = new Date(bYear, bMonth, 0).getDate();
  const days = Array.from(new Array(numberOfDays), (val, index) => 1 + index);

  return (
    <div className={Style["reg_grid"]} style={{ marginBottom: `${dateError && !View3 ? "90px" : "0"}` }}>
      <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {days.map((day, index) => (
          <option value={day} key={index}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, index) => (
          <option value={month} key={index}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegisterChange}>
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div className={!View3 ? Style["input_error"] : `${Style["input_error"]} ${Style["input_error_select_large"]}`}>
          <div className={!View3 ? Style["error_arrow_bottom"] : Style["error_arrow_left"]}></div>
          {dateError}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
