import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import { hideCreatePost } from "../../reducers/createPost-slice";
import useClickOutside from "../shared/hooks/clickOutside-hook";
import { createPostRequest } from "../../helpers/createPost-request";
import CreatePostError from "./CreatePostError";

import Style from "./CreatePostPopup.module.css";
import dataUriToBlob from "../../helpers/dataUriToBlob";
import uploadImage from "../../helpers/uploadImage";

const CreatePostPopup = () => {
  const [text, setText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const createPostRef = useRef();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useClickOutside(createPostRef, () => dispatch(hideCreatePost()));

  const handlePostSubmit = async () => {
    // if we are sending text with background
    if (background) {
      setIsLoading(true);
      const response = await createPostRequest(null, background, text, null, user?.user?.id, user?.user?.token);
      setIsLoading(false);
      if (response === "Success") {
        setBackground("");
        setText("");
        dispatch(hideCreatePost());
      } else {
        setError(response);
      }
    }

    // if we are sending images
    else if (images && images.length) {
      setIsLoading(true);
      const postImages = images.map((image) => {
        return dataUriToBlob(image);
      });
      const path = `${user?.user?.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => formData.append("file", image));
      const response = await uploadImage(formData, path, user?.user?.token);
      const response2 = await createPostRequest(null, null, text, response.images, user?.user?.id, user?.user?.token);
      setIsLoading(false);
      if (response2 === "Success") {
        setText("");
        setImages([]);
        dispatch(hideCreatePost());
      } else {
        setError(response2);
      }
    }

    // if we are sending only text without background
    else if (text) {
      setIsLoading(true);
      const response = await createPostRequest(null, null, text, null, user?.user?.id, user?.user?.token);
      setIsLoading(false);
      if (response === "Success") {
        setText("");
        dispatch(hideCreatePost());
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="blur">
      <div className={Style["postBox"]} ref={createPostRef}>
        {error && <CreatePostError error={error} setError={setError} />}
        <div className={Style["box_header"]}>
          <div className={Style["small_circle"]} onClick={() => dispatch(hideCreatePost())}>
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className={Style["box_profile"]}>
          <img src={user?.user?.picture} alt="user" className={Style["box_profile_image"]} />
          <div className={Style["box_col"]}>
            <div className={Style["box_profile_name"]}>
              {user?.user?.firstName} {user?.user?.lastName}
            </div>
            <div className={Style["box_privacy"]}>
              <img src="../../../icons/public.png" alt="public" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPreview ? (
          <Fragment>
            <EmojiPickerBackgrounds text={text} user={user} setText={setText} background={background} setBackground={setBackground} />
          </Fragment>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            images={images}
            setImages={setImages}
            setShowPreview={setShowPreview}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPreview={setShowPreview} />
        <button className={Style["post_submit"]} onClick={() => handlePostSubmit()} disabled={isloading}>
          {isloading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
