import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import UserLogin from "./pages/login/User-login";
import UserProfile from "./pages/profile/User-profile";
import Home from "./pages/home/Home";
import LoggedInRoutes from "./routes/LoggedIn-routes";
import NotLoggedInRoutes from "./routes/NotLoggedIn-routes";
import Activate from "./pages/home/Activate";
import Reset from "./pages/reset/Reset";
import CreatePostPopup from "./components/createPostPopup/CreatePostPopup";
import axios from "axios";
import { postError, postRequest, postSuccess } from "./reducers/createPost-slice";
import { useEffect } from "react";

function App() {
  const visibleCreatePost = useSelector((state) => state.createPost.visible);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //handling get posts here later might wanna create a separate component
  const getAllPosts = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`;
    const config = { headers: { Authorization: `Bearer ${user?.user?.token}` } };
    try {
      dispatch(postRequest());
      const response = await axios.get(URL, config);
      const data = response.data;
      dispatch(postSuccess(data));
    } catch (error) {
      dispatch(postError(error.response.data.error));
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      {visibleCreatePost && <CreatePostPopup />}
      <Routes>
        {/*if there is a user then LoggedinRoute will return an outlet component which will allow to render the child component else it will return the login component and that will be rendered*/}
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} excat={true} />
          <Route path="/profile" element={<UserProfile />} excat={true} />
          <Route path="/profile/:username" element={<UserProfile />} excat={true} />
          <Route path="/activate/:token" element={<Activate />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<UserLogin />} excat={true} />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
