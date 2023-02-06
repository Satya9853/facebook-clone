import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left/Left-Home";
import RightHome from "../../components/home/right/Right-Home";
import Stories from "../../components/home/stories/Stories";
import CreatePost from "../../components/createPost/CreatePost";
import SendVerification from "../../components/home/sendVerification.js/SendVerification";
import Post from "../../components/post/Post";

import Style from "./Home.module.css";

const Home = () => {
  const [height, setHeight] = useState();
  const middleHomeRef = useRef(null);

  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.createPost.posts);

  useEffect(() => {
    setHeight(middleHomeRef.current.clientHeight);
  }, []);

  return (
    <div className={Style["home"]} style={{ height: `${height + 500}px` }}>
      <Header user={user} page="home" />
      <LeftHome user={user} />
      <div className={Style["home_middle"]} ref={middleHomeRef}>
        <Stories />
        {!user.user.verified && <SendVerification user={user} />}
        <CreatePost user={user} />
        <div className={Style["posts"]}>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
