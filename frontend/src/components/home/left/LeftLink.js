import React from "react";

import Style from "./Left-Home.module.css";

const LeftLink = (props) => {
  return (
    <div className={`${Style["left_link"]} hover1`}>
      <img src={`../../../left/${props.image}.png`} alt="links" />
      {props.notification !== undefined ? (
        <div className={Style["col"]}>
          <div className={Style["col_1"]}>{props.text}</div>
          <div className={Style["col_2"]}>{props.notification}</div>
        </div>
      ) : (
        <span>{props.text}</span>
      )}
    </div>
  );
};

export default LeftLink;
