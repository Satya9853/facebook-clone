import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left/Left-Home";
import RightHome from "../../components/home/right/Right-Home";
import Stories from "../../components/home/stories/Stories";
import CreatePost from "../../components/createPost/CreatePost";
import ActivatePopup from "../../components/activate/Activate-Popup";
import { verify } from "../../reducers/User-slice";

import Style from "./Home.module.css";

const Activate = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = useParams();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/activate`;
      const body = { token };
      const config = { headers: { Authorization: `Bearer ${user.user.token}` } };

      try {
        setIsLoading(true);
        const response = await axios.post(URL, body, config);
        const { message } = response.data;
        setError("");
        setSuccess(message);

        dispatch(verify({ verified: true }));
        Cookies.set("user", JSON.stringify({ ...user.user, verified: true }));

        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 3000);
      } catch (error) {
        setSuccess("");
        setError(error.response.data.error);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 3000);
      }
    };
    activateAccount();
  }, []);

  return (
    <div className={Style["home"]}>
      {success && <ActivatePopup type="success" header="Account verified successfully" text={success} loading={isLoading} />}
      {error && <ActivatePopup type="error" header="Account verification failed" text={error} loading={isLoading} />}

      <Header user={user} />
      <LeftHome user={user} />
      <div className={Style["home_middle"]}>
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
