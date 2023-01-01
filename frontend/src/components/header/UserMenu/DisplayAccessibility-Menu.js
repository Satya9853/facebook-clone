import React from "react";

import Style from "./UserMenu.module.css";

const DisplayAccessibilityMenu = (props) => {
  return (
    <div className={Style["absolute_wrap"]}>
      <div className={Style["absolute_wrap_header"]}>
        <div className={`${Style["circle"]} hover1`} onClick={() => props.setVisible(0)}>
          <i className="arrow_back_icon"></i>
        </div>
        Display Accessibility
      </div>
      <div className={Style["menu_main"]}>
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className={Style["menu_col"]}>
          <span className={Style["menu_span1"]}>Dark Mode</span>
          <span className={Style["menu_span2"]}>Adjust the appearance of Sharebook to reduce glare and give your eyes a break.</span>
        </div>
      </div>

      <label htmlFor="darkoff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="darkoff" />
      </label>
      <label htmlFor="darkon" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkon" />
      </label>

      <div className={Style["menu_main"]}>
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className={Style["menu_col"]}>
          <span className={Style["menu_span1"]}>Compact Mode</span>
          <span className={Style["menu_span2"]}>Make your font size smaller so more content can fit on the screen.</span>
        </div>
      </div>

      <label htmlFor="compactoff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="compactoff" />
      </label>

      <label htmlFor="compacton" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compacton" />
      </label>

      <div className={`${Style["menu_item"]} hover3`}>
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className={Style["rArrow"]}>
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DisplayAccessibilityMenu;
