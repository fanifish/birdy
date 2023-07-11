import { Stage, Layer, Text } from "react-konva";
import SoccerPitch from "./layers/SoccerPitchLayer";
import Ball from "./entities/Ball";
import { useSelector } from "react-redux";
import { useState, useLayoutEffect, useEffect } from "react";
import BirdyPlayer from "./BirdyPlayer";
import { useDispatch } from "react-redux";
import { setPlayers } from "../redux/slices/playersSlice";
import { setBallPosition } from "../redux/slices/ballSlice";
import Player from "./entities/Player";

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

// const videoWidth = 1000;
// const videoHeight = 600;

// const birdyWidth = 300;
// const birdyHeight = 150;

function Birdy() {
  const SCENE_BASE_WIDTH = 3000;
  const SCENE_BASE_HEIGHT = 1000;

  const [width, height] = useWindowSize();

  const dispatch = useDispatch();

  const teamsState = useSelector((state) => state.teams);

  const playersState = useSelector((state) => state.players);

  const viewState = useSelector((state) => state.view);

  const ballState = useSelector((state) => state.ball);
  console.log(ballState);

  const videoState = useSelector((state) => state.video);
  const { currentTime, width: videoWidth, height: videoHeight } = videoState;

  const videoX = xpos;
  const videoY = ypos;

  console.log({ videoWidth, videoHeight });

  const birdyWidth = Math.min(videoWidth / 2, 300);
  const birdyHeight = birdyWidth / 2;

  const pitchX = videoX + videoWidth / 2 - birdyWidth / 2;
  const pitchY = videoY + videoHeight - birdyHeight;

  useEffect(() => {
    const currentTimeInSeconds = Math.floor(currentTime / 1000);
    if (currentTimeInSeconds < 10) {
      const segmentNumber = Math.floor(currentTimeInSeconds / 2);
      console.log(segmentNumber);
      const url = `https://5sol4bk8a4.execute-api.us-east-1.amazonaws.com/prod/guano/2_output.${segmentNumber}.json`;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(setPlayers(data.players));
          dispatch(setBallPosition(data.ball?.coords));
        });
    }
  }, [currentTime, dispatch]);

  return (
    <Stage width={videoWidth} height={videoHeight}>
      <Layer>
        <BirdyPlayer
          src={process.env.PUBLIC_URL + "/assets/ManCityVsManUtd.mp4"}
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
      <Layer>
        <SoccerPitch
          px={pitchX}
          py={pitchY}
          width={birdyWidth}
          height={birdyHeight}
        />
        <>
          {(playersState.players ?? []).map(({ coords, color }, key) => {
            const x = pitchX + coords[0] * birdyWidth;
            const y = pitchY + coords[1] * birdyHeight;
            const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

            if (x > pitchX + 300 || y > pitchY + 150) {
              console.log(coords);
            }

            return <Player key={key} x={x} y={y} color={rgbColor} />;
          })}
        </>
        {ballState.pos && (
          <Ball
            x={pitchX + ballState.pos[0] * birdyWidth}
            y={pitchY + ballState.pos[1] * birdyHeight}
          />
        )}
      </Layer>
    </Stage>
  );
}

export default Birdy;
