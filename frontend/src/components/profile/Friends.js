import React from "react";

import Style from "./Photos.module.css";

const Friends = ({ friends }) => {
  return (
    <div className={Style["profile_card"]}>
      <div className={Style["profile_card_header"]}>
        Friends
        <div className={Style["profile_header_link"]}>See all friends</div>
      </div>
      {friends && (
        <div className={Style["profile_card_count"]}>
          {friends.length === 0 ? "" : friends.length === 1 ? "1 photo" : `${friends.length} friends`}
        </div>
      )}
      <div className={Style["profile_card_grid"]}>
        {friends && friends.length && friends.resources.slice(0, 9).map((friend) => <div className={Style["profile_photo_card"]}></div>)}
      </div>
    </div>
  );
};

export default Friends;
