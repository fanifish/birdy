import { configureStore } from "@reduxjs/toolkit";

import ballReducer from "./slices/ballSlice";
import teamsReducer from "./slices/teamsSlice";
import videoReducer from "./slices/videoSlice";
import viewReducer from "./slices/viewSlice";
import playersReducer from "./slices/playersSlice";

const store = configureStore({
  reducer: {
    ball: ballReducer,
    teams: teamsReducer,
    video: videoReducer,
    view: viewReducer,
    players: playersReducer,
  },
});

export default store;
