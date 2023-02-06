import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import useClickOutside from "../shared/hooks/clickOutside-hook";

import { ArrowDown, Friends, Gaming, HomeActive, Logo, Market, Menu, Notifications, Search, Watch, Messenger, Home } from "../../svg";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu/AllMenu";
import UserMenu from "./UserMenu/UserMenu";

import Style from "./Header.module.css";

const COLOR = "#65676b";

const Header = ({ user, page }) => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const allMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const showSearchMenuHandler = () => {
    setShowSearchMenu(true);
  };

  const hideSearchMenuHandler = () => {
    setShowSearchMenu(false);
  };

  const showAllMenuHandler = () => {
    setShowAllMenu((prev) => !prev);
  };

  const hideAllMenuHandler = () => {
    setShowAllMenu(false);
  };

  const showUserMenuHandler = () => {
    setShowUserMenu((prev) => !prev);
  };

  const hideUserMenuHandler = () => {
    setShowUserMenu(false);
  };

  useClickOutside(allMenuRef, hideAllMenuHandler);
  useClickOutside(userMenuRef, hideUserMenuHandler);

  return (
    <header>
      <div className={Style["header_left"]}>
        <Link to="/" className={Style["header_logo"]}>
          <div className={Style["circle"]}>
            <Logo />
          </div>
        </Link>
        <div className={`${Style["search"]} ${Style["search1"]}`} onClick={showSearchMenuHandler}>
          <Search color={COLOR} />
          <input type="text" placeholder="Search facebook" className={Style["hide_input"]} />
        </div>
      </div>
      {showSearchMenu && <SearchMenu color={COLOR} hideSearchMenuHandler={hideSearchMenuHandler} />}
      <div className={Style["header_middle"]}>
        <Link to="/" className={`${Style["middle_icon"]} ${page === "home" ? Style["active"] : "hover1"}`}>
          {page === "home" ? <HomeActive /> : <Home color={COLOR} />}
        </Link>
        <Link to="/" className={`${Style["middle_icon"]} hover1`}>
          <Friends color={COLOR} />
        </Link>
        <Link to="/" className={`${Style["middle_icon"]} hover1`}>
          <Watch color={COLOR} />
          <div className={Style["middle_notification"]}>9+</div>
        </Link>
        <Link to="/" className={`${Style["middle_icon"]} hover1`}>
          <Market color={COLOR} />
        </Link>
        <Link to="/" className={`${Style["middle_icon"]} hover1`}>
          <Gaming color={COLOR} />
        </Link>
      </div>
      <div className={Style["header_right"]}>
        <Link to="/profile" className={`${Style["profile_link"]} ${page === "profile" ? Style["active_link"] : ""} hover1`}>
          <img src={user?.user?.picture} alt="profile" />
          <span>{user?.user?.firstName}</span>
        </Link>
        <div className={`${Style["circle_icon"]} hover1 ${showAllMenu ? Style["active_header"] : ""}`} ref={allMenuRef}>
          <div onClick={showAllMenuHandler}>
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>
          {showAllMenu && <AllMenu hideAllMenuHandler={hideAllMenuHandler} />}
        </div>
        <div className={`${Style["circle_icon"]} hover1`}>
          <Messenger />
        </div>
        <div className={`${Style["circle_icon"]} hover1`}>
          <Notifications />
          <div className={Style["right_notification"]}>5</div>
        </div>
        <div className={`${Style["circle_icon"]} hover1 ${showUserMenu ? Style["active_header"] : ""}`} ref={userMenuRef}>
          <div onClick={showUserMenuHandler}>
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>
          {showUserMenu && <UserMenu user={user.user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
