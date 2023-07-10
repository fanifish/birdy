import { Stage, Layer, Text } from "react-konva";
import SoccerPitch from "./layers/SoccerPitchLayer";
import Team from "./entities/Team";
import Ball from "./entities/Ball";
import { useSelector } from "react-redux";
import { useState, useLayoutEffect, useEffect } from "react";
import BirdyPlayer from "./BirdyPlayer";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
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

  useEffect(() => {
    const interval = setInterval(() => {}, 2 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [width, height] = useWindowSize();

  const scale = width / SCENE_BASE_WIDTH;

  const teamsState = useSelector((state) => state.teams);

  const viewState = useSelector((state) => state.view);

  const ballState = useSelector((state) => state.ball);

  const videoState = useSelector((state) => state.video);
  const { currentTime } = videoState;

  const videoX = xpos + margin;
  const videoY = ypos + margin;

  const pitchX = videoX + videoWidth / 2 - birdyWidth / 2;
  const pitchY = videoY + videoHeight - birdyHeight;

  useEffect(() => {
    const currentTimeInSeconds = Math.floor(currentTime / 1000);
    if (currentTimeInSeconds % 2 === 0) {
    }
  }, [currentTime]);

  return (
    <Stage width={width} height={height}>
      <Layer>
        <BirdyPlayer
          src={process.env.PUBLIC_URL + "/assets/soccerVideo.mp4"}
          width={videoWidth}
          height={videoHeight}
        />
        <Text
          x={videoX}
          y={videoY}
          text={"" + videoState.currentTime}
          fill="red"
        />
      </Layer>
      <Layer width={width / 2} height={height / 2}>
        <SoccerPitch
          px={pitchX}
          py={pitchY}
          width={birdyWidth}
          height={birdyHeight}
        />
        {teamsState.map((team, key) => (
          <Team
            key={key}
            players={team.players}
            teamColor={team.teamColor}
            px={pitchX}
            py={pitchY}
            width={birdyWidth}
            height={birdyHeight}
          />
        ))}
        <Ball
          pos={ballState.pos}
          px={pitchX}
          py={pitchY}
          width={birdyWidth}
          height={birdyHeight}
        />
      </Layer>
    </Stage>
  );
}

export default Birdy;
