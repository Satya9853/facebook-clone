import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import Style from "./Friendship.module.css";
import useClickOutside from "../shared/hooks/clickOutside-hook";
import { acceptRequest, addFriend, cancelRequest, deleteRequest, follow, unfollow, unfriend } from "../../helpers/user";
import { useEffect } from "react";

const Friendship = ({ friendshipp, profileID }) => {
  const [friendship, setFriendship] = useState({ friendshipp });
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const friendsMenuRef = useRef(null);
  const responseMenuRef = useRef(null);
  const user = useSelector((state) => state.user);

  useClickOutside(friendsMenuRef, () => setFriendsMenu(false));
  useClickOutside(responseMenuRef, () => setRespondMenu(false));

  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  const addFriendHandler = async () => {
    setFriendship({ ...friendshipp, requestSent: true, following: true });
    await addFriend(profileID, user?.user?.token);
  };

  const cancelRequestHandler = async () => {
    setFriendship({ ...friendshipp, requestSent: false, following: false });
    await cancelRequest(profileID, user?.user?.token);
  };

  const followHandler = async () => {
    setFriendship({ ...friendshipp, following: true });
    await follow(profileID, user?.user?.token);
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendshipp, following: false });
    await unfollow(profileID, user?.user?.token);
  };

  const acceptRequestHandler = async () => {
    setFriendship({ ...friendshipp, friends: true, following: true, requestSent: false, requestRecieved: false });
    await acceptRequest(profileID, user?.user?.token);
  };

  const unfriendHandler = async () => {
    setFriendship({ ...friendshipp, friends: false, following: false, requestSent: false, requestRecieved: false });
    await unfriend(profileID, user?.user?.token);
  };

  const deleteRequestHandler = async () => {
    setFriendship({ ...friendshipp, friends: false, following: false, requestSent: false, requestRecieved: false });
    await deleteRequest(profileID, user?.user?.token);
  };

  return (
    <div className={Style["friendship"]}>
      {friendship?.friends ? (
        <div className={Style["firends_menu_wrap"]}>
          <button className="grey_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className={Style["open_cover_menu"]} ref={friendsMenuRef}>
              <div className={`${Style["open_cover_menu_item"]} hover1`}>
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className={`${Style["open_cover_menu_item"]} hover1`}>
                <img src="../../../icons/editFriends.png" alt="" />
                Edit Friend List
              </div>
              {friendship?.following ? (
                <div className={`${Style["open_cover_menu_item"]} hover1`} onClick={() => unfollowHandler()}>
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                <div className={`${Style["open_cover_menu_item"]} hover1`} onClick={() => followHandler()}>
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Follow
                </div>
              )}
              <div className={`${Style["open_cover_menu_item"]} hover1`} onClick={() => unfriendHandler()}>
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestRecieved && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="../../../icons/addFriend.png" alt="" className={Style["invert"]} />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn" onClick={() => cancelRequestHandler()}>
          <img src="../../../icons/cancelRequest.png" alt="" className={Style["invert"]} />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestRecieved && (
          <div className={Style["friends_menu_wrap"]}>
            <button className="grey_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className={Style["open_cover_menu"]} ref={responseMenuRef}>
                <div className={`${Style["open_cover_menu_item"]} hover1`} onClick={() => acceptRequestHandler()}>
                  Confirm
                </div>
                <div className={`${Style["open_cover_menu_item"]} hover1`} onClick={() => deleteRequestHandler()}>
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className={Style["flex"]}>
        {friendship?.following ? (
          <button className="grey_btn" onClick={() => unfollowHandler()}>
            <img src="../../../icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
            <img src="../../../icons/follow.png" className={Style["invert"]} alt="" />
            <span>Follow</span>
          </button>
        )}
        <button className={friendship?.friends ? "blue_btn" : "grey_btn"}>
          <img src="../../../icons/message.png" className={friendship?.friends ? Style["invert"] : ""} alt="" />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default Friendship;
