import React from "react";

import Style from "./Photos.module.css";

const Photos = ({ photos }) => {
  return (
    <div className={Style["profile_card"]}>
      <div className={Style["profile_card_header"]}>
        Photos
        <div className={Style["profile_header_link"]}>See all photos</div>
      </div>
      <div className={Style["profile_card_count"]}>
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 photo"
          : `${photos.total_count} photos`}
      </div>
      <div className={Style["profile_card_grid"]}>
        {photos.resources &&
          photos.resources.length &&
          photos.resources.slice(0, 9).map((img) => (
            <div className={Style["profile_photo_card"]} key={img.public_id}>
              <img src={img.secure_url} alt="posts" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
