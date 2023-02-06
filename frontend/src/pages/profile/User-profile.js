import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import { profileError, profileRequest, profileSuccess } from "../../reducers/profile-slice";
import Style from "./User-profile.module.css";
import ProfileCover from "../../components/profile/ProfileCover";
import ProfilePictureInfos from "../../components/profile/ProfilePictureInfos";
import ProfileMenu from "../../components/profile/ProfileMenu";
import PeopleYouMayKnow from "../../components/profile/PeopleYouMayKnow";
import CreatePost from "../../components/createPost/CreatePost";
import GridPost from "../../components/profile/GridPost";
import Post from "../../components/post/Post";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const { loading, error, profile } = useSelector((state) => state.profile);

  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const final_username = username === undefined ? user?.user?.username : username;

  useEffect(() => {
    const getProfile = async () => {
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
          dispatch(profileSuccess(data));
        }
      } catch (error) {
        dispatch(profileError(error.response.data.error));
      }
    };

    getProfile();
  }, [final_username]);

  const isVisitor = final_username === user?.user?.username ? false : true;
  console.log(profile);

  return (
    <div className={Style["profile"]}>
      <Header user={user} page="profile" />
      <div className={Style["profile_top"]}>
        <div className={Style["profile_container"]}>
          <ProfileCover cover={profile.cover} visitor={isVisitor} />
          <ProfilePictureInfos profile={profile} visitor={isVisitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className={Style["profile_bottom"]}>
        <div className={Style["profile_container"]}>
          <div className={Style["bottom_container"]}>
            <PeopleYouMayKnow />
            <div className={Style["profile_grid"]}>
              <div className={Style["profile_left"]}></div>
              <div className={Style["profile_right"]}>
                {!isVisitor && <CreatePost user={user} page="profile" />} <GridPost />
                <div className={Style["posts"]}>
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => <Post post={post} user={profile} key={post._id} />)
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
