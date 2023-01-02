import React from "react";

import { Dots, NewRoom, Search } from "../../../svg";
import Contact from "./Contact";
import Style from "./Right-Home.module.css";

const COLOR = "#65676b";

const RightHome = (props) => {
  return (
    <div className={Style["right_home"]}>
      <div className={Style["heading"]}>Sponsored</div>
      <div className={Style["splitter1"]}></div>
      <div className={Style["contacts_wrap"]}>
        <div className={Style["contacts_header"]}>
          <div className={Style["contacts_header_left"]}>Contacts</div>
          <div className={Style["contacts_header_right"]}>
            <div className={`${Style["contacts_circle"]} hover1`}>
              <NewRoom color={COLOR} />
            </div>
            <div className={`${Style["contacts_circle"]} hover1`}>
              <Search color={COLOR} />
            </div>
            <div className={`${Style["contacts_circle"]} hover1`}>
              <Dots color={COLOR} />
            </div>
          </div>
        </div>
        <div className={Style["contacts_list"]}>
          <Contact user={props.user} />
        </div>
      </div>
    </div>
  );
};

export default RightHome;
