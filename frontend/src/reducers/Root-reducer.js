import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./User-slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export default rootReducer;
