import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "teams",
  initialState: {
    players: [],
  },
  reducers: {
    setPlayers: (state, action) => {
      return {
        players: action.payload,
      };
    },
  },
});

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
