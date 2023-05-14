import { Fragment, useState } from "react";
import Style from "./Intro.module.css";
import Bio from "./Bio";

const Detail = ({ text, value, img, placeholder, name, handleChange, updateDetails, infos, isRelationship }) => {
  const [show, setShow] = useState();

  return (
    <div>
      <div className={Style["add_details_flex"]} onClick={() => setShow(true)}>
        {value ? (
          <div className={`${Style["info_profile"]}`}>
            <img src={`../../../icons/${img}.png`} alt="icon" />
            {value}
            <i className={`${Style["icon"]} edit_icon`}></i>
          </div>
        ) : (
          <Fragment>
            <i className="rounded_plus_icon"></i>
            <span className={Style["underline"]}> Add {text}</span>
          </Fragment>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          isDetail={true}
          setShow={setShow}
          isRelationship={isRelationship}
        />
      )}
    </div>
  );
};

export default Detail;
