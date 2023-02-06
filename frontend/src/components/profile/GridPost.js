import React from "react";

import Style from "./GridPost.module.css";

const GridPost = () => {
  return (
    <div className={Style["createPost"]}>
      <div className={Style["createPost_header"]} style={{ justifyContent: "space-between" }}>
        <div className={Style["left_header_grid"]}>Posts</div>
        <div className={Style["flex"]}>
          <div className="grey_btn">
            <i className="equalize_icon"></i>
          </div>
          <div className="grey_btn">
            <i className="manage_icon"></i>
            Manage Posts
          </div>
        </div>
      </div>
      <div className={Style["create_splitter"]}></div>
      <div className={`${Style["createPost_body"]} ${Style["grid_2"]}`}>
        <div className={`${Style["view_type"]} ${Style["active_grid"]}`}>
          <i className="list_icon filter_blue"></i>
          List view
        </div>
        <div className={Style["view_type"]}>
          <i className="grid_icon"></i>
          Grid view
        </div>
      </div>
    </div>
  );
};

export default GridPost;
