import React from "react";
import { Link } from "react-router-dom";

import Style from "./Photos.module.css";

const Friends = ({ friends }) => {
  console.log(friends);
  return (
    <div className={Style["profile_card"]}>
      <div className={Style["profile_card_header"]}>
        Friends
        <div className={Style["profile_header_link"]}>See all friends</div>
      </div>
      {friends && <div className={Style["profile_card_count"]}>{friends.length === 0 ? "" : friends.length === 1 ? "1 friend" : `${friends.length} friends`}</div>}
      <div className={Style["profile_card_grid"]}>
        {friends &&
          friends.length &&
          friends.slice(0, 9).map((friend, index) => (
            <Link to={`/profile/${friend.username}`} key={index} className={Style["profile_photo_card"]}>
              <img src={friend.picture} alt="" />
              <span>
                {friend.firstName} {friend.lastName}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Friends;
