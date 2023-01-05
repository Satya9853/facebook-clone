import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { logout } from "../../reducers/User-slice";

import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./ChangePassword";
import LoginFooter from "../../components/login/Login-Footer";

import Style from "./Reset.module.css";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(0);

  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    Cookies.set("user", "");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={Style["reset"]}>
      <div className={Style["reset_header"]}>
        <img src="../../../icons/facebook.svg" alt="facebook" />

        {user ? (
          <div className={Style["right_reset"]}>
            <Link to="/profile">
              <img src={user.picture} alt="user" />
            </Link>
            <button className="blue_btn" onClick={() => logoutHandler()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className={Style["right_reset"]}>
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className={Style["reset_wrap"]}>
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            loading={isLoading}
            setLoading={setIsLoading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfo && (
          <SendEmail userInfo={userInfo} error={error} setError={setError} loading={isLoading} setLoading={setIsLoading} setVisible={setVisible} />
        )}
        {visible === 2 && (
          <CodeVerification
            userInfo={userInfo}
            error={error}
            setError={setError}
            loading={isLoading}
            setLoading={setIsLoading}
            setVisible={setVisible}
            code={code}
            setCode={setCode}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            userInfo={userInfo}
            error={error}
            setError={setError}
            loading={isLoading}
            setLoading={setIsLoading}
          />
        )}
      </div>
      <LoginFooter />
    </div>
  );
};

export default Reset;
