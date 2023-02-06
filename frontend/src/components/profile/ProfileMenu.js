import React from "react";

import Style from "./ProfileMenu.module.css";
import { Link } from "react-router-dom";
import { Dots } from "../../svg";

const ProfileMenu = () => {
  return (
    <div className={Style["profile_menu_wrap"]}>
      <div className={Style["profile_menu"]}>
        <Link to="/" className={Style["profile_menu_active"]}>
          Posts
        </Link>
        <Link to="/" className="hover1">
          About
        </Link>
        <Link to="/" className="hover1">
          Friends
        </Link>
        <Link to="/" className="hover1">
          Photos
        </Link>
        <Link to="/" className="hover1">
          Videos
        </Link>
        <Link to="/" className="hover1">
          Check-ins
        </Link>
        <Link to="/" className="hover1">
          More
        </Link>
        <div className={Style["p10_dots"]}>
          <Dots />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
