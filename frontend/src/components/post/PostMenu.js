import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../shared/hooks/clickOutside-hook";

import MenuItem from "./MenuItem";

import Style from "./Post.module.css";

const PostMenu = ({ postId, noOfImages, setShowPostMenu }) => {
  const user = useSelector((state) => state.user);
  const postMenuRef = useRef(null);

  const isUserPost = postId === user?.user?.id;

  useClickOutside(postMenuRef, () => {
    setShowPostMenu(false);
  });

  return (
    <ul className={Style["post_menu"]} ref={postMenuRef}>
      {isUserPost && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem icon="save_icon" title="Save Post" subTitle="Add this to your saved items" />
      <div className={Style["line"]}></div>
      {isUserPost && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!isUserPost && <MenuItem icon="turnOnNotification_icon" title="Turn on notification for this post" />}
      {noOfImages && <MenuItem icon="download_icon" title="Download" />}
      {noOfImages && <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />}
      {isUserPost && <MenuItem image="../../../icons/lock.png" title="Edit Audience" />}
      {isUserPost && <MenuItem icon="turnOffNotifications_icon" title="Turn off notifications for this post" />}
      {isUserPost && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {isUserPost && <MenuItem icon="date_icon" title="Edit Date" />}
      {isUserPost && <MenuItem icon="refresh_icon" title="Refresh share attachment" />}
      {isUserPost && <MenuItem icon="archive_icon" title="Move to archive" />}
      {isUserPost && <MenuItem icon="trash_icon" title="Move to trash" subTitle="items in your trash are deleted after 30 days" />}
      {!isUserPost && <div className={Style["line"]}></div>}

      {!isUserPost && <MenuItem image="../../../icons/report.png" title="Report Post" subTitle="I'm concerned about this post" />}
    </ul>
  );
};

export default PostMenu;
