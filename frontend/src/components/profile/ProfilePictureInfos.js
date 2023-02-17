import React from "react";

import Style from "./ProfilePictureInfos.module.css";
import { useState } from "react";
import ProfilePicture from "../profilePicture/ProfilePicture";
import { useRef } from "react";

const ProfilePictureInfos = ({ profile, visitor, photos }) => {
  const [showProfilePicturePicker, setShowProfilePicturePicker] =
    useState(false);

  const profileRef = useRef(null);

  return (
    <div className={Style["profile_img_wrap"]}>
      {showProfilePicturePicker && (
        <ProfilePicture
          setShowProfilePicturePicker={setShowProfilePicturePicker}
          profileRef={profileRef}
          photos={photos}
        />
      )}
      <div className={Style["profile_w_left"]}>
        <div className={Style["profile_w_img"]}>
          <div
            ref={profileRef}
            className={Style["profile_w_bg"]}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div
              className={`${Style["profile_circle"]} hover1`}
              onClick={() => setShowProfilePicturePicker(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className={Style["profile_w_col"]}>
          <div className={Style["profile_name"]}>
            {profile.firstName} {profile.lastName}
            <div className={Style["othername"]}>(Other name)</div>
          </div>
          <div className={Style["profile_friend_count"]}></div>
          <div className={Style["profile_friend_imgs"]}></div>
        </div>
      </div>
      {visitor ? (
        ""
      ) : (
        <div className={Style["profile_w_right"]}>
          <div className="blue_btn">
            <img
              src="../../../icons/plus.png"
              alt="add"
              className={Style["invert"]}
            />
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
