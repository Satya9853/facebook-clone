import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left/Left-Home";
import RightHome from "../../components/home/right/Right-Home";
import Stories from "../../components/home/stories/Stories";
import CreatePost from "../../components/createPost/CreatePost";

import Style from "./Home.module.css";
import SendVerification from "../../components/home/sendVerification.js/SendVerification";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className={Style["home"]}>
      <Header user={user} />
      <LeftHome user={user} />
      <div className={Style["home_middle"]}>
        <Stories />
        {!user.user.verified && <SendVerification user={user} />}
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
