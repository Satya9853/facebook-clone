import LoginFrom from "../../components/login/Login-Form";
import LoginFooter from "../../components/login/Login-Footer";
import RegisterForm from "../../components/register/Register-Form";
import Style from "./User-login.module.css";
import { useState } from "react";

const UserLogin = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleSetShowRegister = (props) => {
    setShowRegister((prev) => !prev);
  };

  return (
    <div className={Style["login"]}>
      <div className={Style["login_wrapper"]}>
        <LoginFrom handleSetShowRegister={handleSetShowRegister} />
        {showRegister && <RegisterForm handleSetShowRegister={handleSetShowRegister} />}
        <LoginFooter />
      </div>
    </div>
  );
};

export default UserLogin;
