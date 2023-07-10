import { createSlice } from "@reduxjs/toolkit";

import initialState from "../initialState";

const videoSlice = createSlice({
  name: "video",
  initialState: initialState.videoPlayer,
  reducers: {
    updateTime: (state, action) => ({
      ...state,
      currentTime: action.payload,
    }),
  },
});

export const { updateTime } = videoSlice.actions;

export default videoSlice.reducer;
