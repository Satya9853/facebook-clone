import React from "react";
import { useDispatch } from "react-redux";

import { Feeling, LiveVideo, Photo } from "../../svg";
import { showCreatePost } from "../../reducers/createPost-slice";
import Style from "./CreatePost.module.css";

const CreatePost = ({ user, page }) => {
  const dispatch = useDispatch();
  return (
    <div className={Style["createPost"]}>
      <div className={Style["createPost_header"]}>
        <img src={user?.user?.picture} alt="user" />
        <div
          className={`${Style["open_post"]} hover2`}
          onClick={() => {
            dispatch(showCreatePost());
          }}
        >
          What's on your mind, {user?.user?.firstName}
        </div>
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
        {page === "profile" ? (
          <div className={`${Style["createPost_icon"]} hover1`}>
            <i className="lifeEvent_icon"></i> Life Event
          </div>
        ) : (
          <div className={`${Style["createPost_icon"]} hover1`}>
            <Feeling color="#f7b920" />
            Feeling/Activity
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
