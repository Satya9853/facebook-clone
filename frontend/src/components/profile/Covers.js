import React, { useRef } from "react";

import Style from "./Covers.module.css";
import useClickOutside from "../shared/hooks/clickOutside-hook";

const Covers = ({ photos, setCoverPicture, user, setShow }) => {
  const oldCoverPopRef = useRef(null);

  useClickOutside(oldCoverPopRef, () => {
    setShow(false);
  });
  return (
    <div className="blur">
      <div className={`${Style["postBox"]} ${Style["selectCoverBox"]}`} ref={oldCoverPopRef}>
        <div className={Style["box_header"]}>
          <div className={Style["small_circle"]} onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className={Style["selectCoverBox_links"]}>
          <div className={Style["selectCoverBox_link"]}>Recent photos</div>
          <div className={Style["selectCoverBox_link"]}>Photo albums</div>
        </div>
        <div className={`${Style["old_pictures_wrap"]} scrollbar`}>
          <h4>your cover pictures</h4>
          <div className={Style["old_pictures"]}>
            {photos &&
              photos
                .filter((image) => image.folder === `${user?.user?.username}/cover_pictures`)
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    alt="post"
                    key={photo.public_id}
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
          <h4>other pictures</h4>
          <div className={Style["old_pictures"]}>
            {photos &&
              photos
                .filter((image) => image.folder !== `${user?.user?.username}/post_images`)
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    alt="post"
                    key={photo.public_id}
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Covers;
