import { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import Cropper from "react-easy-crop";

import getCroppedImg from "../../helpers/getCroppedImg";
import uploadImage from "../../helpers/uploadImage";

import Style from "./ProfilePicture.module.css";
import "./crooper.css";
import { updateImage } from "../../helpers/updateImage";
import { createPostRequest } from "../../helpers/createPost-request";

const ResizeProfilePicture = ({ setImage, image, setError }) => {
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const sliderRef = useRef(null);

  const user = useSelector((state) => state.user);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomOut = () => {
    sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };

  const zoomIn = () => {
    sliderRef.current.stepUp();
    setZoom(sliderRef.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      const img = await getCroppedImage();
      const blob = await fetch(img).then((data) => data.blob());
      const path = `${user?.user?.username}/profile_pictures`;
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImage(formData, path, user?.user?.token);
      const imageUrl = res.images[0].url;
      const updatedImage = await updateImage(imageUrl, user?.user?.token);
      if (updatedImage === "Success") {
        const newPost = await createPostRequest(
          "profile-picture",
          null,
          description,
          res.images,
          user?.user?.id,
          user?.user?.token
        );
        if (newPost === "Success") {
        } else {
          setError(newPost);
        }
      } else {
        setError(updatedImage);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className={`${Style["postBox"]} ${Style["update_img"]} update_img`}>
      <div className={Style["box_header"]}>
        <div className={Style["small_circle"]} onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className={Style["update_image_desc"]}>
        <textarea
          className={`${Style["textarea_blue"]} ${Style["details_input"]}`}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className={Style["update_center"]}>
        <div className={Style["crooper"]}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className={Style["slider"]}>
          <div className={`${Style["slider_circle"]} hover1`} onClick={zoomOut}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            value={zoom}
            step={0.2}
            onChange={(event) => setZoom(event.target.value)}
            ref={sliderRef}
          />
          <div className={`${Style["slider_circle"]} hover1`} onClick={zoomIn}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className={Style["flex_up"]}>
        <div className="grey_btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="grey_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      <div className={Style["flex_p_t"]}>
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className={Style["update_submit_wrap"]}>
        <div className={Style["blue_link"]}>Cancel</div>
        <button className="blue_btn" onClick={() => updateProfilePicture()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ResizeProfilePicture;
