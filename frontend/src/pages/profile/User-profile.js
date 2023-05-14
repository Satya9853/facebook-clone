import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import Header from "../../components/header/Header";
import { profileError, profileRequest, profileSuccess } from "../../reducers/profile-slice";
import ProfileCover from "../../components/profile/ProfileCover";
import ProfilePictureInfos from "../../components/profile/ProfilePictureInfos";
import ProfileMenu from "../../components/profile/ProfileMenu";
import PeopleYouMayKnow from "../../components/profile/PeopleYouMayKnow";
import CreatePost from "../../components/createPost/CreatePost";
import GridPost from "../../components/profile/GridPost";
import Post from "../../components/post/Post";
import Photos from "../../components/profile/Photos";
import Friends from "../../components/profile/Friends";
import LeftFooter from "../../components/profile/Left-footer";
import Intro from "../../components/intro/Intro";

import Style from "./User-profile.module.css";

const UserProfile = () => {
  const [photos, setphotos] = useState({});
  const [otherName, setOtherName] = useState();
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  const user = useSelector((state) => state.user);
  const { loading, error, profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { username } = useParams();
  const navigate = useNavigate();
  const profileTopRef = useRef(null);
  const leftSideRef = useRef(null);

  let final_username = username === undefined ? user?.user?.username : username;

  const check = useMediaQuery({
    query: "(min-width:901px)",
  });

  console.log("this", profile);

  const getScroll = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    const getProfile = async () => {
      console.log("working");
      const URL = `${process.env.REACT_APP_BACKEND_URL}/getProfile/${final_username}`;

      const config = {
        headers: { Authorization: `Bearer ${user?.user?.token}` },
      };

      try {
        dispatch(profileRequest());
        const response = await axios.get(URL, config);
        const data = response.data;
        if (data.ok === false) {
          navigate("/profile");
        } else {
          const URL = `${process.env.REACT_APP_BACKEND_URL}/listImages`;
          const config = {
            headers: { Authorization: `Bearer ${user?.user?.token}` },
          };
          const body = {
            path: `${final_username}/*`,
            max: 30,
            sort: "desc",
          };
          try {
            const response = await axios.post(URL, body, config);
            const images = response.data;
            setphotos(images);
          } catch (error) {
            console.log(error);
          }
          dispatch(profileSuccess(data));
        }
      } catch (error) {
        dispatch(profileError(error.response.data.error));
      }
    };

    getProfile();
  }, [final_username]);

  useEffect(() => {
    setOtherName(profile?.details?.otherName);
  }, [profile]);

  useEffect(() => {
    setHeight(profileTopRef.current.clientHeight + 300);
    setLeftHeight(leftSideRef.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading]);

  const isVisitor = final_username === user?.user?.username ? false : true;

  return (
    <div className={Style["profile"]}>
      <Header user={user} page="profile" />
      <div className={Style["profile_top"]} ref={profileTopRef}>
        <div className={Style["profile_container"]}>
          <ProfileCover cover={profile.cover} visitor={isVisitor} photos={photos.resources} />
          <ProfilePictureInfos profile={profile} visitor={isVisitor} photos={photos.resources} otherName={otherName} />
          <ProfileMenu />
        </div>
      </div>
      <div className={Style["profile_bottom"]}>
        <div className={Style["profile_container"]}>
          <div className={Style["bottom_container"]}>
            <PeopleYouMayKnow />
            <div
              className={`${Style["profile_grid"]} ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? `${Style["scrollFixed"]} ${Style["showless"]}`
                  : check && scrollHeight >= height && leftHeight < 1000
                  ? `${Style["scrollFixed"]} ${Style["showmore"]} `
                  : ""
              }`}
            >
              <div className={Style["profile_left"]} ref={leftSideRef}>
                <Intro details={profile.details} isVisitor={isVisitor} setOtherName={setOtherName} />
                <Photos username={final_username} token={user?.user?.token} photos={photos} />
                <Friends friends={profile.friends} />
                <LeftFooter />
              </div>
              <div className={Style["profile_right"]}>
                {!isVisitor && <CreatePost user={user} page="profile" />} <GridPost />
                <div className={Style["posts"]}>
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => <Post post={post} user={profile} key={post._id} page="profile" />)
                  ) : (
                    <div className={Style["no_posts"]}>No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
