import React from "react";

import Style from "./Stories.module.css";
import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/storiesHome-data";
import Story from "./Story";
import { useMediaQuery } from "react-responsive";

const Stories = () => {
  const query1175px = useMediaQuery({
    query: "(max-width:1175px)",
  });

  const query1030px = useMediaQuery({
    query: "(max-width:1030px)",
  });

  const query960px = useMediaQuery({
    query: "(max-width:960px)",
  });

  const query885px = useMediaQuery({
    query: "(max-width:885px)",
  });

  const max = query885px ? 5 : query960px ? 4 : query1030px ? 5 : query1175px ? 4 : stories.length;

  return (
    <div className={Style["stories"]}>
      <div className={Style["create_story_card"]}>
        <img src="../../../images/default_pic.png" alt="stories" className={Style["create_story_img"]} />
        <div className={Style["plus_story"]}>
          <Plus color="#fff" />
        </div>
        <div className={Style["story_create_text"]}>Create Story</div>
      </div>
      {stories.slice(0, max).map((story, index) => (
        <Story storyData={story} key={index} />
      ))}
      <div className={Style["white_circle"]}>
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
