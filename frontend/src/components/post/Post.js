import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { Dots, Public } from "../../svg";
import ReactPopup from "./ReactPopup";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";

import Style from "./Post.module.css";

const Post = ({ post }) => {
  const [showReactPopup, setShowReactPopup] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  let postImageClass = "";

  if (post.images && post.images.length !== 0) {
    if (post.images.length === 1) postImageClass = "grid_1";
    if (post.images.length === 2) postImageClass = "grid_2";
    if (post.images.length === 3) postImageClass = "grid_3";
    if (post.images.length === 4) postImageClass = "grid_4";
    if (post.images.length >= 5) postImageClass = "grid_5";
  }
  return (
    <div className={Style["post"]}>
      <div className={Style["post_header"]}>
        <Link to={`/profile/${post.user.username}`} className={Style["post_header_left"]}>
          <img src={post.user.picture} />
          <div className={Style["header_col"]}>
            <div className={Style["post_profile_name"]}>
              {post.user.firstName} {post.user.lastName}
              <div className={Style["updated_p"]}>
                {post.type === "profie-picture" && `updated ${post.user.gender === "male" ? "his" : "her"} profile picture`}
                {post.type === "cover-picture" && `updated ${post.user.gender === "male" ? "his" : "her"} cover picture`}
              </div>
            </div>
            <div className={Style["post_profile_privacy_date"]}>
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div className={`${Style["post_header_right"]} hover1`} onClick={() => setShowPostMenu((prev) => !prev)}>
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div className={Style["post_bg"]} style={{ backgroundImage: `url(${post.background})` }}>
          <div className={Style["post_bg_text"]}>{post.text}</div>
        </div>
      ) : (
        <Fragment>
          <div className={Style["post_text"]}>{post.text}</div>
          {post.images && post.images.length && (
            <div className={Style[postImageClass]}>
              {post.images.slice(0, 5).map((image, index) => (
                <img src={image.url} key={index} alt="post" className={Style[`img-${index}`]} />
              ))}
              {post.images.length > 5 && <div className={Style["more_pics_shadow"]}>+{post.images.length - 5}</div>}
            </div>
          )}
        </Fragment>
      )}
      <div className={Style["post_infos"]}>
        <div className={Style["reacts_count"]}>
          <div className={Style["reacts_count_imgs"]}></div>
          <div className={Style["reacts_count_num"]}></div>
        </div>
        <div className={Style["to_right"]}>
          <div className={Style["comments_count"]}>13 comments</div>
          <div className={Style["share_count"]}>1 share</div>
        </div>
      </div>
      <div className={Style["post_actions"]}>
        {showReactPopup && <ReactPopup setShowReactPopup={setShowReactPopup} />}
        <div
          className={`${Style["post_action"]} hover1`}
          onMouseOver={() => setTimeout(() => setShowReactPopup(true), 500)}
          onMouseLeave={() => setTimeout(() => setShowReactPopup(false), 500)}
        >
          <i className="like_icon"></i>
          <span>Like</span>
        </div>
        <div className={`${Style["post_action"]} hover1`}>
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className={`${Style["post_action"]} hover1`}>
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className={Style["comments_wrap"]}>
        <div className={Style["comments_order"]}></div>
        <CreateComment />
      </div>
      {showPostMenu && <PostMenu postId={post?.user?._id} noOfImages={post?.images?.length} setShowPostMenu={setShowPostMenu} />}
    </div>
  );
};

export default Post;
