import LoginFrom from "../../components/login/Login-Form";
import LoginFooter from "../../components/login/Login-Footer";
import RegisterForm from "../../components/register/Register-Form";
import Style from "./User-login.module.css";

const UserLogin = () => {
  return (
    <div className={Style["login"]}>
      <div className={Style["login_wrapper"]}>
        <LoginFrom />
        <RegisterForm />
        <LoginFooter />
      </div>
    </div>
  );
};

export default UserLogin;
