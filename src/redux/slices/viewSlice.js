import { createSlice } from "@reduxjs/toolkit";

import initialState from "../initialState";

const viewSlice = createSlice({
  name: "view",
  initialState: initialState.view,
  reducers: {
    updateHeatMapImage: (state, action) => ({
      ...state,
      heatMapImage: action.payload,
    })
  },
});

export const { updateHeatMapImage} = viewSlice.actions;

export default viewSlice.reducer;
