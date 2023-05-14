import React, { useRef } from "react";
import Detail from "./Detail";
import Style from "./Intro.module.css";
import useClickOutside from "../shared/hooks/clickOutside-hook";
const EditDetails = ({ details, handleChange, updateDetails, infos, setShowEditDetails }) => {
  const editDetailsRef = useRef();

  useClickOutside(editDetailsRef, () => setShowEditDetails(false));
  return (
    <div className="blur">
      <div className={`${Style["postBox"]} ${Style["infosBox"]}`} ref={editDetailsRef}>
        <div className={Style["box_header"]}>
          <div className={`${Style["small_circle"]}`} onClick={() => setShowEditDetails(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className={`${Style["details_wrapper"]} scrollbar`}>
          <div className={Style["details_col"]}>
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className={Style["details_header"]}>Other Name</div>
          <Detail
            text="Other Name"
            value={details?.otherName}
            img="studies"
            placeholder="Other name"
            name="otherName"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={Style["details_header"]}>Work</div>
          <Detail text="a job" value={details?.job} img="job" placeholder="Add a job title" name="job" handleChange={handleChange} updateDetails={updateDetails} infos={infos} />
          <Detail
            text="Workplace"
            value={details?.workplace}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={Style["details_header"]}>Education</div>
          <Detail
            text="a high school"
            value={details?.highschool}
            img="studies"
            placeholder="Add a high school"
            name="highschool"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            text="a college"
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={Style["details_header"]}>Current city</div>
          <Detail
            text="a current city"
            value={details?.currentCity}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={Style["details_header"]}>Hometown</div>
          <Detail
            text="a hometown"
            value={details?.hometown}
            img="home"
            placeholder="Add a hometown"
            name="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={Style["details_header"]}>Relationship</div>
          <Detail
            text="relationship"
            value={details?.relationship}
            img="relationship"
            placeholder="Relationship"
            name="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            isRelationship={true}
          />
          <div className={Style["details_header"]}>Instagram</div>
          <Detail
            text="Instagram"
            value={details?.instagram}
            img="instagram"
            placeholder="Add instagram"
            name="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
