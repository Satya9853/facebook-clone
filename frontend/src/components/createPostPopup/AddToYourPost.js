import React from "react";
import { Dots, Feeling, Photo } from "../../svg";

import Style from "./CreatePostPopup.module.css";

const AddToYourPost = ({ setShowPreview }) => {
  return (
    <div className={Style["add_to_your_post"]}>
      <div className={Style["add_to_text"]}>Add to your post</div>
      <div className={`${Style["post_header_right"]} hover1`} onClick={() => setShowPreview(true)}>
        <Photo color="#45bd62" />
      </div>
      <div className={`${Style["post_header_right"]} hover1`}>
        <i className="tag_icon"></i>
      </div>
      <div className={`${Style["post_header_right"]} hover1`}>
        <Feeling color="#f7b928" />
      </div>
      <div className={`${Style["post_header_right"]} hover1`}>
        <i className="maps_icon"></i>
      </div>
      <div className={`${Style["post_header_right"]} hover1`}>
        <i className="microphone_icon"></i>
      </div>
      <div className={`${Style["post_header_right"]} hover1`}>
        <Dots color="#65676b" />
      </div>
    </div>
  );
};

export default AddToYourPost;
