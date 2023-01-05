import { Routes, Route } from "react-router-dom";

import UserLogin from "./pages/login/User-login";
import UserProfile from "./pages/profile/User-profile";
import Home from "./pages/home/Home";
import LoggedInRoutes from "./routes/LoggedIn-routes";
import NotLoggedInRoutes from "./routes/NotLoggedIn-routes";
import Activate from "./pages/home/Activate";
import Reset from "./pages/reset/Reset";

function App() {
  return (
    <div>
      <Routes>
        {/*if there is a user then LoggedinRoute will return an outlet component which will allow to render the child component else it will return the login component and that will be rendered*/}
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} excat={true} />
          <Route path="/profile" element={<UserProfile />} excat={true} />
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
