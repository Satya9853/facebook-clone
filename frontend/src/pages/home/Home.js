import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left/Left-Home";
import RightHome from "../../components/home/right/Right-Home";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Header user={user} />
      <LeftHome user={user} />
      <RightHome user={user} />
    </div>
  );
};

export default Home;
