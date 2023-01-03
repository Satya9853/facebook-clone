import React from "react";

import Style from "./CreatePost.module.css";
import { Feeling, LiveVideo, Photo } from "../../svg";

const CreatePost = ({ user }) => {
  return (
    <div className={Style["createPost"]}>
      <div className={Style["createPost_header"]}>
        <img src={user?.user?.picture} alt="user" />
        <div className={`${Style["open_post"]} hover2`}>What's on your mind, {user?.user?.firstName}</div>
      </div>
      <div className={Style["create_splitter"]}></div>
      <div className={Style["createPost_body"]}>
        <div className={`${Style["createPost_icon"]} hover1`}>
          <LiveVideo color="#f3425f" />
          LiveVideo
        </div>
        <div className={`${Style["createPost_icon"]} hover1`}>
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className={`${Style["createPost_icon"]} hover1`}>
          <Feeling color="#f7b920" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
