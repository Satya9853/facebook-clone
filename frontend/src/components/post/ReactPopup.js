import React from "react";

import Style from "./Post.module.css";

const reactsArray = [
  { name: "like", image: "../../../reacts/like.gif" },
  { name: "love", image: "../../../reacts/love.gif" },
  { name: "haha", image: "../../../reacts/haha.gif" },
  { name: "wow", image: "../../../reacts/wow.gif" },
  { name: "sad", image: "../../../reacts/sad.gif" },
  { name: "angry", image: "../../../reacts/angry.gif" },
];

const ReactPopup = ({ setShowReactPopup }) => {
  return (
    <div
      className={Style["reacts_popup"]}
      onMouseOver={() => setTimeout(() => setShowReactPopup(true), 500)}
      onMouseLeave={() => setTimeout(() => setShowReactPopup(false), 500)}
    >
      {reactsArray.map((react, index) => (
        <div className={Style["react"]} key={index}>
          <img src={react.image} alt="reacts" />
        </div>
      ))}
    </div>
  );
};

export default ReactPopup;
