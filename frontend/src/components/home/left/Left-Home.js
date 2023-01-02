import React, { useState } from "react";
import { Link } from "react-router-dom";

import LeftLink from "./LeftLink";
import { leftHomeData } from "../../../data/leftHome-data";
import { ArrowDown1 } from "../../../svg";
import Shortcut from "./Shortcut";
import Style from "./Left-Home.module.css";

const LeftHome = (props) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={`${Style["left_home"]} scrollbar`}>
      <Link to="/profile" className={`${Style["left_link"]} hover1`}>
        <img src={props.user?.user?.picture} alt="user" />
        <span>
          {props.user?.user?.firstName} {props.user?.user?.lastName}
        </span>
      </Link>
      {leftHomeData.slice(0, 8).map((item, index) => (
        <LeftLink image={item.img} text={item.text} notification={item.notification} key={index} />
      ))}
      {!showMore && (
        <div className={`${Style["left_link"]} hover1`} onClick={() => setShowMore(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {showMore && (
        <div className={Style["more_left"]}>
          {leftHomeData.slice(8, leftHomeData.length).map((item, index) => (
            <LeftLink image={item.img} text={item.text} notification={item.notification} key={index} />
          ))}
          <div className={`${Style["left_link"]} hover1`} onClick={() => setShowMore(false)}>
            <div className={`${Style["rotate360"]} small_circle`}>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className={Style["splitter"]}></div>
      <div className={Style["shortcut"]}>
        <div className={Style["heading"]}>Your Shortcuts</div>
        <div className={Style["edit_shortcut"]}>Edit</div>
      </div>
      <div className={Style["shortcut_list"]}>
        <Shortcut link="/" image="../../images/ytb.png" name="My Youtube Channel" />
        <Shortcut link="/" image="../../images/insta.png" name="My instagram" />
      </div>
      <div className={`${Style["fb_copyright"]} ${showMore ? Style["relative_fb_copyright"] : ""}`}>
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
    </div>
  );
};

export default LeftHome;
