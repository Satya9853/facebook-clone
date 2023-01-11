import React from "react";
import Style from "./CreatePostPopup.module.css";

const CreatePostError = ({ error, setError }) => {
  return (
    <div className={Style["post_error"]}>
      <div className={Style["post_error_text"]}>{error}</div>
      <button className="blue_btn" onClick={() => setError("")}>
        Try again
      </button>
    </div>
  );
};

export default CreatePostError;
