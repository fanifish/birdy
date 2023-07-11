import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const ballSlice = createSlice({
  name: "ball",
  initialState: {
    pos: [0, 0],
  },
  reducers: {
    setBallPosition: (state, action) => {
      state.pos = action.payload;
    },
  },
});

export const { setBallPosition } = ballSlice.actions;

export default ballSlice.reducer;
