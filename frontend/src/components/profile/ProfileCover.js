import React, { useRef, useState } from "react";

import Style from "./ProfileCover.module.css";
import useClickOutside from "../shared/hooks/clickOutside-hook";

const ProfileCover = ({ cover, visitor }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);

  const coverMenuRef = useRef(null);

  useClickOutside(coverMenuRef, () => setShowCoverMenu(false));

  return (
    <div className={Style["profile_cover"]}>
      {cover && <img src={cover} alt="cover" className={Style["cover"]} />}
      {!visitor && (
        <div className={Style["update_cover_wrapper"]}>
          <div className={Style["open_cover_update"]} onClick={() => setShowCoverMenu((prev) => !prev)}>
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className={Style["open_cover_menu"]} ref={coverMenuRef}>
              <div className={`${Style["open_cover_menu_item"]} hover1`}>
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div className={`${Style["open_cover_menu_item"]} hover1`}>
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCover;
