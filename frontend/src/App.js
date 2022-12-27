import { Routes, Route } from "react-router-dom";

import UserLogin from "./pages/login/User-login";
import UserProfile from "./pages/profile/User-profile";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} excat={true} />
        <Route path="/login" element={<UserLogin />} excat={true} />
        <Route path="/profile" element={<UserProfile />} excat={true} />
      </Routes>
    </div>
  );
}

export default App;
