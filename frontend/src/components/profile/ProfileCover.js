import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Cropper from "react-easy-crop";

import useClickOutside from "../shared/hooks/clickOutside-hook";
import getCroppedImg from "../../helpers/getCroppedImg";
import uploadImage from "../../helpers/uploadImage";
import { updateCoverPicture } from "../../helpers/updateImage";
import { createPostRequest } from "../../helpers/createPost-request";

import Style from "./ProfileCover.module.css";
import "../profilePicture/cropper.css";
import Covers from "./Covers";

const ProfileCover = ({ cover, visitor, photos }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [error, setError] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [coverWidth, setCoverWidth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const coverMenuRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const coverRef = useRef(null);
  const coverPictureRef = useRef();

  const user = useSelector((state) => state.user);

  useClickOutside(coverMenuRef, () => setShowCoverMenu(false));

  useEffect(() => {
    setCoverWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  const handleImage = (event) => {
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
      setCoverPicture(event.target.result);
    };
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateCoverPictureRequest = async () => {
    try {
      setLoading(true);
      const img = await getCroppedImage();
      const blob = await fetch(img).then((data) => data.blob());
      const path = `${user?.user?.username}/cover_pictures`;
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImage(formData, path, user?.user?.token);
      const imageUrl = res.images[0].url;
      const updatedImage = await updateCoverPicture(imageUrl, user?.user?.token);
      if (updatedImage === "Success") {
        const newPost = await createPostRequest("cover-picture", null, null, res.images, user?.user?.id, user?.user?.token);
        if (newPost === "Success") {
          setLoading(false);
          setCoverPicture("");
          coverPictureRef.current.src = imageUrl;
        } else {
          setLoading(false);
          setError(newPost);
        }
      } else {
        setLoading(false);
        setError(updatedImage);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className={Style["profile_cover"]} ref={coverRef}>
      {coverPicture && (
        <div className={Style["save_changes_cover"]}>
          <div className={Style["save_changes_left"]}>
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className={Style["save_changes_right"]}>
            <button className={`${Style["opacity_btn"]} blue_btn`} onClick={() => setCoverPicture("")}>
              Cancel
            </button>
            <button className="blue_btn" onClick={updateCoverPictureRequest}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
            </button>
          </div>
        </div>
      )}
      <input type="file" ref={coverImageInputRef} hidden accept="image/jpeg,image/png,image/jpg,image/webp,image/gif" onChange={handleImage} />
      {error && (
        <div className={`${Style["post_error"]} ${Style["comment_error"]}`}>
          <div className={Style["post_error_text"]}>{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className={`${Style["cover_cropper"]} cover_cropper`}>
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={coverWidth / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && <img src={cover} alt="cover" className={Style["cover"]} ref={coverPictureRef} />}
      {!visitor && (
        <div className={Style["update_cover_wrapper"]}>
          <div className={Style["open_cover_update"]} onClick={() => setShowCoverMenu((prev) => !prev)}>
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className={Style["open_cover_menu"]} ref={coverMenuRef}>
              <div className={`${Style["open_cover_menu_item"]} hover1`} onClick={() => setShow(true)}>
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div className={`${Style["open_cover_menu_item"]} hover1`} onClick={() => coverImageInputRef.current.click()}>
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && <Covers photos={photos} setCoverPicture={setCoverPicture} user={user} setShow={setShow} />}
    </div>
  );
};

export default ProfileCover;
