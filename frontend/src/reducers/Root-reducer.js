import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./User-slice";
import createPostReducer from "./createPost-slice";
import profileReducer from "./profile-slice";
import photoReducer from "./photos-slice";

const rootReducer = combineReducers({
  user: userReducer,
  createPost: createPostReducer,
  profile: profileReducer,
  photo: photoReducer,
});

export default rootReducer;
