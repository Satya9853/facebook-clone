import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: { user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { login } = userSlice.actions;
