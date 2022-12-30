import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      state = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { login } = userSlice.actions;
