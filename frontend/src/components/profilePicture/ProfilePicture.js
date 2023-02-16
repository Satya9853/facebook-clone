import React from "react";
import { useRef } from "react";
import { useState } from "react";

import Style from "./ProfilePicture.module.css";
import ResizeProfilePicture from "./ResizeProfilePicture";
const ProfilePicture = () => {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const imagePickerRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file.type.split("/")[0] !== "image") {
      setError(`${file.name} format is unsupported ! select an image file`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError("File size is too large, max 5mb is allowed");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={imagePickerRef}
        hidden
        onChange={handleChange}
        accept="image/png,image/jpeg,image/webp,image.gif"
      />
      <div className={`${Style["postBox"]} ${Style["pictureBox"]}`}>
        <div className={Style["box_header"]}>
          <div className={Style["small_circle"]}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className={Style["update_picture_wrap"]}>
          <div className={Style["update_picture_buttons"]}>
            <button
              className="light_blue_btn"
              style={{ color: "var(--blue-color)" }}
              onClick={() => imagePickerRef.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="grey_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className={`${Style["post_error"]} ${Style["comment_error"]}`}>
            <div className={Style["post_error_text"]}>{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className={Style["old_pictures_wrap"]}></div>
      </div>
      {image && <ResizeProfilePicture setImage={setImage} image={image} setError={setError} />}
    </div>
  );
};

export default ProfilePicture;
