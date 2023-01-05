import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SettingPrivacyMenu from "./SettingPrivacy-Menu";
import HelpSupportMenu from "./HelpSupport-Menu";
import DisplayAccessibilityMenu from "./DisplayAccessibility-Menu";
import { useDispatch } from "react-redux";

import Style from "./UserMenu.module.css";
import Cookies from "js-cookie";
import { logout } from "../../../reducers/User-slice";

const UserMenu = (props) => {
  // Here we are using numbers so that according to the number we show a particular menu example for 0 we will show the outer menu then for 1 we will show the settings and privacy extended Menu
  const [visible, setVisible] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.set("user", "");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={Style["menu"]}>
      {visible === 0 && (
        <div>
          <Link to="/profile" className={`${Style["menu_header"]} hover3`}>
            <img src={props.user?.picture} alt="user" />
            <div className={Style["menu_col"]}>
              <span>
                {props.user?.firstName} {props.user?.lastname}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className={Style["menu_splitter"]}></div>
          <div className={`${Style["menu_main"]} hover3`}>
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className={Style["menu_col"]}>
              <div className={Style["menu_span1"]}>Give feedback</div>
              <div className={Style["menu_span2"]}>Help us improve facebook</div>
            </div>
          </div>
          <div className={Style["menu_splitter"]}></div>
          <div className={`${Style["menu_item"]} hover3`} onClick={() => setVisible(1)}>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings & Privacy</span>
            <div className={`${Style["rArrow"]}`}>
              <i className="right_icon"></i>
            </div>
          </div>
          <div className={`${Style["menu_item"]} hover3`} onClick={() => setVisible(2)}>
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & Support</span>
            <div className={`${Style["rArrow"]}`}>
              <i className="right_icon"></i>
            </div>
          </div>
          <div className={`${Style["menu_item"]} hover3`} onClick={() => setVisible(3)}>
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className={`${Style["rArrow"]}`}>
              <i className="right_icon"></i>
            </div>
          </div>
          <div className={`${Style["menu_item"]} hover3`} onClick={logoutHandler}>
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visible === 1 && <SettingPrivacyMenu setVisible={setVisible} />}
      {visible === 2 && <HelpSupportMenu setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibilityMenu setVisible={setVisible} />}
    </div>
  );
};

export default UserMenu;
