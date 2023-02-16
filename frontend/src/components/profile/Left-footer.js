import React from "react";

import Style from "./Left-footer.module.css";
import { Link } from "react-router-dom";

const LeftFooter = () => {
  return (
    <div className={Style["relative_fb_copyright"]}>
      <Link to="/">Privacy </Link>
      <span>. </span>
      <Link to="/">Terms </Link>
      <span>. </span>
      <Link to="/">Advertising </Link>
      <span>. </span>
      <Link to="/">
        Ad Choices <i className="ad_choices_icon"></i>
      </Link>
      <span>. </span>
      <Link to="/">Cookies </Link>
      <span>. </span>
      <Link to="/">More </Link>
      <span>. </span>
      <br />
      Sharebook © 2023
    </div>
  );
};

export default LeftFooter;
