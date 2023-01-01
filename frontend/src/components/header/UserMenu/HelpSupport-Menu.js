import React from "react";

import Style from "./UserMenu.module.css";

const HelpSupportMenu = (props) => {
  return (
    <div className={Style["absolute_wrap"]}>
      <div className={Style["absolute_wrap_header"]}>
        <div className={`${Style["circle"]} hover1`} onClick={() => props.setVisible(0)}>
          <i className="arrow_back_icon"></i>
        </div>
        Help & Support
      </div>
      <div className={`${Style["menu_item"]} hover3`}>
        <div className="small_circle">
          <i className="help_center_icon"></i>
        </div>
        <span>Help Center</span>
      </div>
      <div className={`${Style["menu_item"]} hover3`}>
        <div className="small_circle">
          <i className="email_icon"></i>
        </div>
        <span>Support Inbox</span>
      </div>
      <div className={`${Style["menu_item"]} hover3`}>
        <div className="small_circle">
          <i className="info_filled_icon"></i>
        </div>
        <span>Report a Problem</span>
      </div>
    </div>
  );
};

export default HelpSupportMenu;
