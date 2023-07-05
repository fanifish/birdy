import { Stage, Layer, Text } from 'react-konva';
import SoccerPitch from './layers/SoccerPitchLayer';
import Team from './entities/Team';
import Ball from './entities/Ball';
import { useSelector } from 'react-redux';
import { useState, useLayoutEffect } from 'react';
import BirdyPlayer from './BirdyPlayer';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const xpos = 0;
const ypos = 0;
const margin = 100;
const videoWidth = 1000;
const videoHeight = 600;
const birdyWidth = 300;
const birdyHeight = 150;

function Birdy() {

    const SCENE_BASE_WIDTH = 3000;
    const SCENE_BASE_HEIGHT = 1000;

    const [width, height] = useWindowSize();


    const scale = width / SCENE_BASE_WIDTH;

    const teams = useSelector(state => state.teams);

    const view = useSelector(state => state.view);

    const ballState = useSelector(state => state.ballState);

    const videoPlayer = useSelector(state => state.videoPlayer);

    var videoX = xpos + margin;
    var videoY = ypos + margin;

    var pitchX = videoX + (videoWidth / 2) - (birdyWidth / 2);
    var pitchY = videoY + videoHeight - birdyHeight;

    return (
        <div className="App">
            <Stage width={width} height={height}>
                <Layer>
                    {
                        BirdyPlayer({ src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", width: videoWidth, height: videoHeight })
                    }
                    {
                        <Text
                            x={videoX}
                            y={videoY}
                            text={"" + videoPlayer.currentTime}
                            fill="red"
                        />
                    }
                </Layer>
                <Layer width={width / 2} height={height / 2}>
                    {
                        SoccerPitch({ px: pitchX, py: pitchY, width: birdyWidth, height: birdyHeight })
                    }
                    {
                        teams.map(team => Team({ players: team.players, teamColor: team.teamColor }, pitchX, pitchY))
                    }
                    {
                        Ball(ballState, pitchX, pitchY)
                    }
                </Layer>
            </Stage>
        </div>
    );
}

export default Birdy;