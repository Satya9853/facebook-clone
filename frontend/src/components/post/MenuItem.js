import React from "react";

import Style from "./Post.module.css";

const MenuItem = ({ icon, title, subTitle, image }) => {
  return (
    <li className="hover1">
      {image ? <img src={image} alt="icon" /> : <i className={icon}></i>}

      <div className={Style["post_menu_text"]}>
        <span>{title}</span>
        {subTitle && <span className={Style["menu_post_col"]}>{subTitle}</span>}
      </div>
    </li>
  );
};

export default MenuItem;
