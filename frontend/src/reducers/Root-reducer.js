import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./User-slice";
import createPostReducer from "./createPost-slice";

const rootReducer = combineReducers({
  user: userReducer,
  createPost: createPostReducer,
});

export default rootReducer;
