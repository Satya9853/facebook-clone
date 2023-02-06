import React from "react";

import Style from "./PeopleYouMayKnow.module.css";

const AddFriendSmallCard = ({ item }) => {
  return (
    <div className={Style["addFriendCard"]}>
      <div className={Style["addFriend_img_small"]}>
        <img src={item.profile_picture} alt="profile" />
        <div className={Style["addFriend_infos"]}>
          <div className={Style["addFriend_name"]}>
            {item.profile_name.length > 11 ? `${item.profile_name.substring(0, 11)}...` : item.profile_name}
          </div>
          <div className={`${Style["btn_adjust"]} light_blue_btn`}>
            <img src="../../../icons/addFriend.png" alt="button" className="filter_blue" />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
