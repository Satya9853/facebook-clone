import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { photoError, photoRequest, photoSuccess } from "../../reducers/photos-slice";
import axios from "axios";
import Style from "./Photos.module.css";

const Photos = ({ username, token }) => {
  const { loading, error, photos } = useSelector((state) => state.photo);

  const dispatch = useDispatch();

  useEffect(() => {
    const getPhoto = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/listImages`;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const body = {
        path: `${username}/*`,
        max: 30,
        sort: "desc",
      };

      try {
        dispatch(photoRequest());
        const response = await axios.post(URL, body, config);
        const data = response.data;
        dispatch(photoSuccess(data));
      } catch (error) {
        dispatch(photoError(error.response.data.error));
      }
    };

    getPhoto();
  }, [username]);

  return (
    <div className={Style["profile_card"]}>
      <div className={Style["profile_card_header"]}>
        Photos
        <div className={Style["profile_header_link"]}>See all photos</div>
      </div>
      <div className={Style["profile_card_count"]}>
        {photos.total_count === 0 ? "" : photos.total_count === 1 ? "1 photo" : `${photos.total_count} photos`}
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
