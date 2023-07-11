const initialState = {
  videoPlayer: {
    currentTime: 0,
    aspectRatio: 0,
  },
  ballState: {
    pos: {
      x: 60 / 300,
      y: 50 / 150,
    },
  },
  view: {
    birdyOpacity: 1,
    heatMapImage: 1,
    modalOpen: false
  },
  teams: [
    {
      teamName: "teamA",
      teamColor: "rgb(0, 255, 0)",
      players: [
        {
          name: "Faniel",
          num: 10,
          pos: {
            x: 180 / 300,
            y: 45 / 150,
          },
        },
        {
          name: "Faniel1",
          num: 11,
          pos: {
            x: 60 / 300,
            y: 25 / 150,
          },
        },
        {
          name: "Faniel",
          num: 8,
          pos: {
            x: 30 / 300,
            y: 55 / 150,
          },
        },
        {
          name: "Faniel",
          num: 7,
          pos: {
            x: 30 / 300,
            y: 85 / 150,
          },
        },
        {
          name: "Faniel",
          num: 9,
          pos: {
            x: 270 / 300,
            y: 85 / 150,
          },
        },
      ],
    },
    {
      teamName: "teamB",
      teamColor: "blue",
      players: [
        {
          name: "Faniel",
          num: 10,
          pos: {
            x: 60 / 300,
            y: 100 / 150,
          },
        },
        {
          name: "Faniel1",
          num: 11,
          pos: {
            x: 90 / 300,
            y: 650 / 150,
          },
        },
        {
          name: "Faniel",
          num: 8,
          pos: {
            x: 300 / 300,
            y: 75 / 150,
          },
        },
        {
          name: "Faniel",
          num: 7,
          pos: {
            x: 200 / 300,
            y: 55 / 150,
          },
        },
        {
          name: "Faniel",
          num: 9,
          pos: {
            x: 190 / 300,
            y: 85 / 150,
          },
        },
      ],
    },
  ],
};

export default initialState;
