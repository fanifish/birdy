import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const ballSlice = createSlice({
  name: "ball",
  initialState: initialState.ballState,
  reducers: {},
});

export const {} = ballSlice.actions;

export default ballSlice.reducer;
