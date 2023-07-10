import { createSlice } from "@reduxjs/toolkit";

import initialState from "../initialState";

const teamsSlice = createSlice({
  name: "teams",
  initialState: initialState.teams,
  reducers: {},
});

export const {} = teamsSlice.actions;

export default teamsSlice.reducer;
