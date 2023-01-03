import React from "react";

import Style from "./Story.module.css";

const Story = (props) => {
  return (
    <div className={Style["story"]}>
      <img src={props.storyData.image} alt="Story" className={Style["story_img"]} />
      <div className={Style["story_profile_pic"]}>
        <img src={props.storyData.profile_picture} alt="user" />
      </div>
      <div className={Style["story_profile_name"]}>{props.storyData.profile_name}</div>
    </div>
  );
};

export default Story;
