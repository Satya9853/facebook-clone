import { createSlice, current } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: { visible: false, loading: false, error: "", posts: [] },
  reducers: {
    showCreatePost(state) {
      state.visible = true;
    },
    hideCreatePost(state) {
      state.visible = false;
    },
    postRequest(state) {
      state.loading = true;
    },
    postSuccess(state, action) {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
    },
    postError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default createPostSlice.reducer;

export const { showCreatePost, hideCreatePost, postRequest, postSuccess, postError } = createPostSlice.actions;
