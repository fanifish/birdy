import { configureStore } from "@reduxjs/toolkit";

import ballReducer from "./slices/ballSlice";
import teamsReducer from "./slices/teamsSlice";
import videoReducer from "./slices/videoSlice";
import viewReducer from "./slices/viewSlice";

const store = configureStore({
  reducer: {
    ball: ballReducer,
    teams: teamsReducer,
    video: videoReducer,
    view: viewReducer,
  },
});

export default store;
