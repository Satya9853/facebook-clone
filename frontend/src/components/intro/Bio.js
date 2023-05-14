import React from "react";

import Style from "./Intro.module.css";

const Bio = ({ infos, handleChange, maxLength, updateDetails, placeholder, name, isDetail, setShow, isRelationship }) => {
  return (
    <div className={Style["add_bio_wrap"]}>
      {isRelationship ? (
        <select className={Style["select_rel"]} name={name} value={infos?.[name]} onChange={handleChange}>
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          maxLength={isDetail ? "25" : "100"}
          className={`${Style["textarea_blue"]} ${Style["details_input"]}`}
          onChange={handleChange}
        ></textarea>
      )}
      {!isDetail && <div className={Style["remaining"]}> {maxLength} Characters remaining</div>}
      <div className={Style["flex"]}>
        <div className={`${Style["flex"]} ${Style["flex_left"]}`}>
          <i className="public_icon"></i>Public
        </div>
        <div className={`${Style["flex"]} ${Style["flex_right"]}`}>
          <button className="grey_btn" onClick={() => setShow(false)}>
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              updateDetails();
              isDetail && setShow();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
