const initialState = {
    videoPlayer: {
        currentTime: 0
    },
    ballState: {
        pos: {
            x: 60,
            y: 50
        }
    },
    view: {
        birdyOpacity: 1
    },
    teams: [
        {
            teamName: 'teamA',
            teamColor: "orange",
            players: [
                {
                    name: 'Faniel',
                    num: 10,
                    pos: {
                        x: 180,
                        y: 45
                    }
                },
                {
                    name: 'Faniel1',
                    num: 11,
                    pos: {
                        x: 60,
                        y: 25
                    }
                },
                {
                    name: 'Faniel',
                    num: 8,
                    pos: {
                        x: 30,
                        y: 55
                    }
                },
                {
                    name: 'Faniel',
                    num: 7,
                    pos: {
                        x: 30,
                        y: 85
                    }
                },
                {
                    name: 'Faniel',
                    num: 9,
                    pos: {
                        x: 270,
                        y: 85
                    }
                }
            ]
        },
        {
            teamName: 'teamB',
            teamColor: 'blue',
            players: [
                {
                    name: 'Faniel',
                    num: 10,
                    pos: {
                        x: 60,
                        y: 100
                    }
                },
                {
                    name: 'Faniel1',
                    num: 11,
                    pos: {
                        x: 90,
                        y: 650
                    }
                },
                {
                    name: 'Faniel',
                    num: 8,
                    pos: {
                        x: 300,
                        y: 75
                    }
                },
                {
                    name: 'Faniel',
                    num: 7,
                    pos: {
                        x: 200,
                        y: 55
                    }
                },
                {
                    name: 'Faniel',
                    num: 9,
                    pos: {
                        x: 190,
                        y: 85
                    }
                }
            ]
        }
    ]
}

export default initialState;
