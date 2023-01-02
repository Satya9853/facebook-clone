import React from "react";

import Style from "./Contact.module.css";

const Contact = (props) => {
  return (
    <div className={`${Style["contact"]} hover3`}>
      <div className={Style["contact_img"]}>
        <img src={props.user.user.picture} alt="user" />
      </div>
      <span>
        {props.user.user.firstName} {props.user.user.lastName}
      </span>
    </div>
  );
};

export default Contact;
