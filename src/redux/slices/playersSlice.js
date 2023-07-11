import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "teams",
  initialState: {
    mockedPlayers: [
      "İlkay Gündoğan",
      "Jack Grealish",
      "Kevin De Bruyne",
      "Kyle Walker",
      "Manuel Akanji",
      "Erling Haaland",
    ],
    players: [],
  },
  reducers: {
    setPlayers: (state, action) => {
      return {
        ...state,
        players: action.payload,
      };
    },
  },
});

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
