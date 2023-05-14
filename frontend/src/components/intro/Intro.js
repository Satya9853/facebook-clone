import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Bio from "./Bio";

import Style from "./Intro.module.css";
import EditDetails from "./EditDetails";

const Intro = ({ details, isVisitor, setOtherName }) => {
  const [detailsState, setDetailsState] = useState();

  const initialValue = {
    bio: detailsState?.bio ? detailsState.bio : "",
    otherName: detailsState?.otherName ? detailsState.otherName : "",
    job: detailsState?.job ? detailsState.job : "",
    workplace: detailsState?.workplace ? detailsState.workplace : "",
    college: detailsState?.college ? detailsState.college : "",
    highschool: detailsState?.highschool ? detailsState.highschool : "",
    currentCity: detailsState?.currentCity ? detailsState.currentCity : "",
    hometown: detailsState?.hometown ? detailsState.hometown : "",
    relationship: detailsState?.relationship ? detailsState.relationship : "",
    instagram: detailsState?.instagram ? detailsState.instagram : "",
  };

  const [infos, setInfos] = useState(initialValue);
  const [showBio, setShowBio] = useState(false);
  const [maxLength, setMaxLength] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setDetailsState(details);
    setInfos(details);
  }, [details]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfos({ ...infos, [name]: value });
    setMaxLength(100 - event.target.value.length);
  };

  const updateDetails = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/updateDetails`;
    const config = {
      headers: { Authorization: `Bearer ${user?.user?.token}` },
    };
    try {
      const { data } = await axios.put(URL, { infos }, config);
      setShowBio(false);
      setDetailsState(data?.details);
      setOtherName(data?.details?.otherName);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className={Style["profile_card"]}>
      <div className={Style["profile_card_header"]}>Intro</div>

      {detailsState?.bio && !showBio && (
        <div className={Style["info_col"]}>
          <span className={Style["info_text"]}>{detailsState?.bio}</span>
          {!isVisitor && (
            <button className="grey_btn hover2" onClick={() => setShowBio(true)}>
              Edit Bio
            </button>
          )}
        </div>
      )}

      {!detailsState?.bio && !showBio && !isVisitor && (
        <button className={`grey_btn hover2 ${Style["w100"]}`} onClick={() => setShowBio(true)}>
          Add Bio
        </button>
      )}

      {showBio && <Bio infos={infos} handleChange={handleChange} maxLength={maxLength} setShow={setShowBio} updateDetails={updateDetails} placeholder="Add Bio" name="bio" />}

      {detailsState?.job && detailsState?.workplace ? (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/job.png" alt="icons" />
          works as {detailsState?.job} at {detailsState?.workplace}
        </div>
      ) : detailsState?.job && !detailsState?.workplace ? (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/job.png" alt="icons" />
          works as {detailsState?.job}
        </div>
      ) : (
        detailsState?.workplace &&
        !detailsState?.job && (
          <div className={Style["info_profile"]}>
            <img src="../../../icons/job.png" alt="icons" />
            works at {detailsState?.workplace}
          </div>
        )
      )}

      {detailsState?.relationship && (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/relationship.png" alt="icons" />
          {detailsState?.relationship}
        </div>
      )}

      {detailsState?.college && (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/studies.png" alt="icons" />
          studied at {detailsState?.college}
        </div>
      )}

      {detailsState?.highschool && (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/studies.png" alt="icons" />
          studied at {detailsState?.highschool}
        </div>
      )}

      {detailsState?.currentCity && (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/home.png" alt="icons" />
          Lives in {detailsState?.currentCity}
        </div>
      )}

      {detailsState?.hometown && (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/home.png" alt="icons" />
          From {detailsState?.hometown}
        </div>
      )}

      {detailsState?.instagram && (
        <div className={Style["info_profile"]}>
          <img src="../../../icons/instagram.png" alt="icons" />
          <a href={`https://www/instagram.com/${detailsState?.instagram}`} target="blank">
            {detailsState?.instagram}
          </a>
        </div>
      )}
      {!isVisitor && (
        <button className={`grey_btn hover2 ${Style["w100"]}`} onClick={() => setShowEditDetails(true)}>
          Edit Details
        </button>
      )}

      {showEditDetails && !isVisitor && (
        <EditDetails handleChange={handleChange} details={detailsState} updateDetails={updateDetails} infos={infos} setShowEditDetails={setShowEditDetails} />
      )}

      {!isVisitor && <button className={`grey_btn hover2 ${Style["w100"]}`}>Add Hobbies</button>}
      {!isVisitor && <button className={`grey_btn hover2 ${Style["w100"]}`}>Add Featured</button>}
    </div>
  );
};

export default Intro;
