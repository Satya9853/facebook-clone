import { createSlice, current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },

    verify(state, action) {
      state.user = {
        ...current(state).user,
        verified: action.payload.verified,
      };
    },

    logout(state, action) {
      return (state = null);
    },

    updatePicture(state, action) {
      state.user.picture = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { login, verify, logout, updatePicture } = userSlice.actions;
