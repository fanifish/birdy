import { createSlice } from "@reduxjs/toolkit";

import initialState from "../initialState";

const viewSlice = createSlice({
  name: "view",
  initialState: initialState.view,
  reducers: {},
});

export const {} = viewSlice.actions;

export default viewSlice.reducer;
