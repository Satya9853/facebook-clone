import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state);
  console.log(user);
  return <div>Home</div>;
};

export default Home;
