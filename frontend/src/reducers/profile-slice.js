import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { loading: false, error: "", profile: {} },
  reducers: {
    profileRequest(state) {
      state.loading = true;
    },

    profileSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.profile = action.payload;
    },

    profileError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default profileSlice.reducer;

export const { profileRequest, profileSuccess, profileError } = profileSlice.actions;
