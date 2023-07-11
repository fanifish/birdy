import { createSlice } from "@reduxjs/toolkit";

import initialState from "../initialState";

const viewSlice = createSlice({
  name: "view",
  initialState: initialState.view,
  reducers: {
    updateHeatMapImage: (state, action) => ({
      ...state,
      heatMapImage: action.payload,
    }),
    openModal: (state, action) => ({
      ...state,
      modalOpen: true,
    }),
    closeModal: (state, action) => ({
      ...state,
      modalOpen: false,
    })
  },
});

export const { updateHeatMapImage, openModal, closeModal} = viewSlice.actions;

export default viewSlice.reducer;
