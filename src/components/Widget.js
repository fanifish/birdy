import React, { useState } from "react";
import { Layer, Rect, Stage, Image } from "react-konva";
import useImage from "use-image";
import SoccerPitch from "./layers/SoccerPitchLayer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Input, Row} from "reactstrap";
import Player from "./entities/Player";

import PurpleCameraImage from '../images/purple_camera.png';
import YellowCameraImage from '../images/yellow_camera.png';
import {updateHeatMapImage} from "../redux/slices/viewSlice";

export default function Widget() {
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.view);
  
  const [player, setPlayer] = useState(undefined);
  
  const [purpleCamera] = useImage(PurpleCameraImage);
  const [yellowCamera] = useImage(YellowCameraImage);

  const [leftCamera, setLeftCamera] = useState(true);
  const [rightCamera, setRightCamera] = useState(true);

  const [leftCameraShowing, setLeftCameraShowing] = useState(false);
  const [rightCameraShowing, setRightCameraShowing] = useState(false);

  const videoState = useSelector((state) => state.video);
  const { width: videoWidth } = videoState;

  const { players, mockedPlayers } = useSelector((state) => state.players);

  const widgetWidth = videoWidth / 2;
  const widgetHeight = widgetWidth / 2;
  
  const handlePlayerChange = (e) => {
    setPlayer(e.target.value);
    dispatch(updateHeatMapImage(viewState.heatMapImage === 1 ? 2 : 1));
  }

  return (
    <Row>
      <Col>
        <Stage width={widgetWidth} height={widgetHeight}>
          <Layer>
            <SoccerPitch
              width={widgetWidth}
              height={widgetHeight}
              withBackground={true}
            />
            {(players ?? []).map(({ coords, color, identity }, key) => {
              const x = coords[0] * widgetWidth;
              const y = coords[1] * widgetHeight;
              const rgbColor = `rgb(${color[2]}, ${color[1]}, ${color[0]})`;

              return <Player key={key} x={x} y={y} color={rgbColor} num={""} />;
            })}
          </Layer>
          <Layer>
            {leftCamera && (
              <Image
                image={yellowCamera}
                x={30}
                y={widgetHeight - 30}
                offsetX={widgetHeight * .25}
                rotation={180 + 45}
                width={widgetHeight * .5}
                height={widgetHeight * .75}
                opacity={leftCameraShowing ? 0.8 : 0.5}
                onClick={() => {
                  setLeftCameraShowing((current) => !current);
                  setRightCameraShowing(false);
                }}
              />
            )}
            {rightCamera && (
              <Image
                image={purpleCamera}
                x={widgetWidth - 30}
                y={widgetHeight - 30}
                offsetX={widgetHeight * .25}
                rotation={180 - 45}
                width={widgetHeight * .5}
                height={widgetHeight * .75}
                opacity={rightCameraShowing ? 0.8 : 0.5}
                onClick={() => {
                  setRightCameraShowing((current) => !current);
                  setLeftCameraShowing(false);
                }}
              />
            )}
            <Rect
              x={0}
              y={widgetHeight - 30}
              width={30}
              height={30}
              fill="black"
              opacity={1}
              onClick={() => setLeftCamera((current) => !current)}
            />
            <Rect
              x={widgetWidth - 30}
              y={widgetHeight - 30}
              width={30}
              height={30}
              fill="black"
              opacity={1}
              onClick={() => setRightCamera((current) => !current)}
            />
          </Layer>
        </Stage>
      </Col>
      <Col>
        <Input
          type="select"
          value={player}
          onChange={handlePlayerChange}
        >
          {mockedPlayers.map((name, key) => (
            <option key={key}>{name}</option>
          ))}
        </Input>
      </Col>
    </Row>
  );
}
