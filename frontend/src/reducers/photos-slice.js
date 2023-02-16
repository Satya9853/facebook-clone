import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photo",
  initialState: { loading: false, error: "", photos: {} },
  reducers: {
    photoRequest(state) {
      state.loading = true;
    },

    photoSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.photos = action.payload;
    },

    photoError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default photoSlice.reducer;

export const { photoRequest, photoError, photoSuccess } = photoSlice.actions;
