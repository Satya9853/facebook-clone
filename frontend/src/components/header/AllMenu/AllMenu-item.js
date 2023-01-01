import React from "react";

import Style from "./AllMenu-item.module.css";

const AllMenuItem = (props) => {
  return (
    <div className={`${Style["all_menu_item"]} hover1`}>
      <img src={`../../left/${props.icon}.png`} alt="" />
      <div className={Style["all_menu_col"]}>
        <span>{props.name} </span>
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default AllMenuItem;
