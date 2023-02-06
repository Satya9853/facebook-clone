import React from "react";

import Style from "./PeopleYouMayKnow.module.css";
import { Dots } from "../../svg";
import { stories } from "../../data/storiesHome-data";
import AddFriendSmallCard from "./AddFriendSmallCard";

const PeopleYouMayKnow = () => {
  return (
    <div className={Style["pplumayknow"]}>
      <div className={Style["pplumayknow_header"]}>
        People You May Know
        <div className={`${Style["post_header_right"]} ${Style["ppl_circle"]} hover1`}>
          <Dots />
        </div>
      </div>
      <div className={Style["pplumayknow_list"]}>
        {stories.map((item, index) => (
          <AddFriendSmallCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
