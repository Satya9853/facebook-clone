import React from "react";

import Style from "./Activate-Popup.module.css";
import { PropagateLoader } from "react-spinners";

const ActivatePopup = (props) => {
  return (
    <div className="blur">
      <div className={Style["popup"]}>
        <div className={`${Style["popup_header"]} ${props.type === "success" ? Style["success_text"] : Style["error_text"]}`}>{props.header}</div>
        <div className={Style["popup_message"]}>{props.text}</div>
        <PropagateLoader color="#1876f2" size={30} loading={props.loading} />
      </div>
    </div>
  );
};

export default ActivatePopup;
