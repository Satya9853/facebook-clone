import React, { useEffect, useRef, useState } from "react";

import useClickOutside from "../shared/hooks/clickOutside-hook";
import { Return, Search } from "../../svg";
import Style from "./SearchMenu.module.css";

const SearchMenu = (props) => {
  const [showIcon, setShowIcon] = useState(true);

  const searchMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  useClickOutside(searchMenuRef, props.hideSearchMenuHandler);

  // we are using this useEffect so that when the Search menu gets rendered for the first time the search gets focused immediately
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const inputFocushandler = () => {
    searchInputRef.current.focus();
  };

  const showIconHandler = () => {
    setShowIcon(true);
  };

  const hideIconHandler = () => {
    setShowIcon(false);
  };

  return (
    <div className={`${Style["header_left"]} ${Style["search_area"]} ${Style["scrollbar"]}`} ref={searchMenuRef}>
      <div className={Style["search_wrap"]}>
        <div className={Style["header_logo"]}>
          <div className={`${Style["circle"]} hover1`} onClick={props.hideSearchMenuHandler}>
            <Return color={props.color} />
          </div>
        </div>
        <div className={Style["search"]} onClick={inputFocushandler}>
          {showIcon && (
            <div>
              <Search color={props.color} />
            </div>
          )}
          <input type="text" placeholder="Search Facebook" ref={searchInputRef} onFocus={hideIconHandler} onBlur={showIconHandler} />
        </div>
      </div>
      <div className={Style["search_history_header"]}>
        <span>Recent Searches</span>
        <a>Edit</a>
      </div>
      <div className={Style["search_history"]}></div>
      <div className={`${Style["search_history"]} ${Style["scrollbar"]}`}></div>
    </div>
  );
};

export default SearchMenu;
