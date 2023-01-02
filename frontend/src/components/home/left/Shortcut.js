import React from "react";

import Style from "./Shortcut.module.css";

const Shortcut = (props) => {
  return (
    <a href={props.link} target="_blank" rel="noreferer" className={Style["shortcut_item"]}>
      <img src={props.image} alt="shortcut" />
      <span>{props.name}</span>
    </a>
  );
};

export default Shortcut;
