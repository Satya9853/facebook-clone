import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./User-slice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
