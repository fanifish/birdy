import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    currentTime: 0,
    width: 0,
    height: 0,
  },
  reducers: {
    updateTime: (state, action) => ({
      ...state,
      currentTime: action.payload,
    }),

    updateSize: (state, action) => ({
      ...state,
      width: action.payload.width,
      height: action.payload.height,
    }),

    updateAspectRatio: (state, action) => ({
      ...state,
      aspectRatio: action.payload,
    }),
  },
});

export const { updateTime, updateSize, updateAspectRatio } = videoSlice.actions;

export default videoSlice.reducer;
