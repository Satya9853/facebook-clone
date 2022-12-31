import React, { useState } from "react";
import Style from "./Header.module.css";
import { ArrowDown, Friends, Gaming, HomeActive, Logo, Market, Menu, Notifications, Search, Watch, Messenger } from "../../svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";

const COLOR = "#65676b";

const Header = () => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const showSearchMenuHandler = () => {
    setShowSearchMenu(true);
  };

  const hideSearchMenuHandler = () => {
    setShowSearchMenu(false);
  };

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
        <Link to="/" className={`${Style["middle_icon"]} ${Style["active"]}`}>
          <HomeActive />
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
        <Link to="/profile" className={`${Style["profile_link"]} hover1`}>
          <img src={user?.user?.picture} alt="profile" />
          <span>{user?.user?.firstName}</span>
        </Link>
        <div className={`${Style["circle_icon"]} hover1`}>
          <Menu />
        </div>
        <div className={`${Style["circle_icon"]} hover1`}>
          <Messenger />
        </div>
        <div className={`${Style["circle_icon"]} hover1`}>
          <Notifications />
          <div className={Style["right_notification"]}>5</div>
        </div>
        <div className={`${Style["circle_icon"]} hover1`}>
          <ArrowDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
