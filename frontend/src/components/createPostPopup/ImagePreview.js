import React, { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

import Style from "./CreatePostPopup.module.css";

const ImagePreview = ({ text, setText, user, images, setImages, setShowPreview, setError }) => {
  const imagepickerRef = useRef();

  const imageHandler = (event) => {
    let files = Array.from(event.target.files);
    files.forEach((file) => {
      if (file.type.split("/")[0] !== "image") {
        setError(`${file.name} format is unsupported ! select an image file`);
        files = files.filter((image) => image.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        setError("File size is too large, max 5mb is allowed");
        files = files.filter((image) => image.name !== file.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setImages((prev) => [...prev, readerEvent.target.result]);
      };
    });
  };

  // conditional class name according to number of images the user select
  let previewClass = "";
  const numberOfImages = images.length;
  if (numberOfImages === 1) previewClass = "preview1";
  else if (numberOfImages === 2) previewClass = "preview2";
  else if (numberOfImages === 3) previewClass = "preview3";
  else if (numberOfImages === 4) previewClass = "preview4";
  else if (numberOfImages === 5) previewClass = "preview5";
  else if (numberOfImages % 2 === 0) {
    previewClass = "preview6";
  } else {
    previewClass = "preview_odd";
  }

  return (
    <div className={`${Style["overflow_a"]} scrollbar`}>
      <EmojiPickerBackgrounds text={text} setText={setText} user={user} type2={1} />
      <div className={Style["add_pics_wrap"]}>
        <input type="file" accept="image/*" multiple hidden ref={imagepickerRef} onChange={imageHandler} />
        {images && images.length ? (
          <div className={`${Style["add_pics_inside1"]} ${Style["p0"]}`}>
            <div className={Style["preview_actions"]}>
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button className="hover1" onClick={() => imagepickerRef.current.click()}>
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div className={Style["small_white_circle"]} onClick={() => setImages([])}>
              <i className="exit_icon"></i>
            </div>
            <div className={Style[previewClass]}>
              {images.map((image, index) => (
                <img src={image} key={index} alt="preview" />
              ))}
            </div>
          </div>
        ) : (
          <div className={Style["add_pics_inside1"]}>
            <div className={Style["small_white_circle"]} onClick={() => setShowPreview(false)}>
              <i className="exit_icon"></i>
            </div>
            <div className={Style["add_col"]} onClick={() => imagepickerRef.current.click()}>
              <div className={Style["add_circle"]}>
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className={Style["add_pics_inside2"]}>
          <div className={Style["add_circle"]}>
            <i className="phone_icon"></i>
          </div>
          <div className={Style["mobile_text"]}>Add photos from your mobile device.</div>
          <span className={Style["add_phone_btn"]}>Add</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
