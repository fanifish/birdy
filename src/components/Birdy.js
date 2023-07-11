import { Stage, Layer, Text } from "react-konva";
import SoccerPitch from "./layers/SoccerPitchLayer";
import Ball from "./entities/Ball";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import BirdyPlayer from "./BirdyPlayer";
import { useDispatch } from "react-redux";
import { setPlayers } from "../redux/slices/playersSlice";
import { setBallPosition } from "../redux/slices/ballSlice";
import Player from "./entities/Player";

const xpos = 0;
const ypos = 0;

function Birdy() {
  const dispatch = useDispatch();

  const teamsState = useSelector((state) => state.teams);

  const playersState = useSelector((state) => state.players);

  const viewState = useSelector((state) => state.view);

  const ballState = useSelector((state) => state.ball);

  const videoState = useSelector((state) => state.video);
  const { currentTime, width: videoWidth, height: videoHeight } = videoState;

  const videoX = xpos;
  const videoY = ypos;

  const birdyWidth = Math.min(videoWidth / 2, 300);
  const birdyHeight = birdyWidth / 2;

  const pitchX = videoX + videoWidth / 2 - birdyWidth / 2;
  const pitchY = videoY + videoHeight - birdyHeight - 30;

  useEffect(() => {
    const currentTimeInSeconds = Math.floor(currentTime / 1000);
    const segmentNumber = Math.floor(currentTimeInSeconds / 2);
    const url = `https://5sol4bk8a4.execute-api.us-east-1.amazonaws.com/prod/guano/ManCityVsManUtdRynpe_output.${segmentNumber}.json`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setPlayers(data.players));
        dispatch(setBallPosition(data.ball?.coords));
      });
  }, [currentTime, dispatch]);

  return (
    <Stage width={videoWidth} height={videoHeight + 15}>
      <Layer>
        <BirdyPlayer
          src={process.env.PUBLIC_URL + "/assets/ManCityVsManUtd.mp4"}
          width={videoWidth}
          height={videoHeight + 15}
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
          {(playersState.players ?? []).map(
            ({ coords, color, identity }, key) => {
              const x = pitchX + coords[0] * birdyWidth;
              const y = pitchY + coords[1] * birdyHeight;
              const rgbColor = `rgb(${color[2]}, ${color[1]}, ${color[0]})`;

              return <Player key={key} x={x} y={y} color={rgbColor} num={""} />;
            }
          )}
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
