import React from "react";
import { useState } from "react";
import { useRef } from "react";

import ProfilePicture from "../profilePicture/ProfilePicture";
import Friendship from "./Friendship";

import Style from "./ProfilePictureInfos.module.css";
import { Link } from "react-router-dom";

const ProfilePictureInfos = ({ profile, visitor, photos, otherName }) => {
  const [showProfilePicturePicker, setShowProfilePicturePicker] = useState(false);

  const profileRef = useRef(null);

  return (
    <div className={Style["profile_img_wrap"]}>
      {showProfilePicturePicker && <ProfilePicture setShowProfilePicturePicker={setShowProfilePicturePicker} profileRef={profileRef} photos={photos} />}
      <div className={Style["profile_w_left"]}>
        <div className={Style["profile_w_img"]}>
          <div
            ref={profileRef}
            className={Style["profile_w_bg"]}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile?.picture})`,
            }}
          ></div>
          {!visitor && (
            <div className={`${Style["profile_circle"]} hover1`} onClick={() => setShowProfilePicturePicker(true)}>
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className={Style["profile_w_col"]}>
          <div className={Style["profile_name"]}>
            <span>
              {profile?.firstName} {profile?.lastName}
            </span>
            <div className={Style["othername"]}>{otherName ? `(${otherName})` : ""}</div>
          </div>
          <div className={Style["profile_friend_count"]}>
            {profile?.friends?.length === 0 ? "" : profile?.friends?.length === 1 ? "1 friend" : `${profile?.friends?.length} friends`}
          </div>
          <div className={Style["profile_friend_imgs"]}>
            {profile?.friends &&
              profile?.friends.slice(0, 6).map((friend, index) => (
                <Link to={`/profile/${friend.username}`} key={index}>
                  <img src={friend.picture} alt="" style={{ transform: `trnslateX(${-index * 7}px)`, zIndex: `${index}` }} />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {visitor ? (
        <Friendship friendshipp={profile?.friendship} profileID={profile._id} />
      ) : (
        <div className={Style["profile_w_right"]}>
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="add" className={Style["invert"]} />
            <span>Add to story</span>
          </div>
          <div className="grey_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInfos;
