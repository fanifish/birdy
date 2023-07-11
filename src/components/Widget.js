import React, { useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import SoccerPitch from "./layers/SoccerPitchLayer";
import { useSelector } from "react-redux";
import { Col, Input, Row } from "reactstrap";
import Player from "./entities/Player";

export default function Widget() {
  const [player, setPlayer] = useState(undefined);

  const [leftCamera, setLeftCamera] = useState(true);
  const [rightCamera, setRightCamera] = useState(true);

  const [leftCameraShowing, setLeftCameraShowing] = useState(false);
  const [rightCameraShowing, setRightCameraShowing] = useState(false);

  const videoState = useSelector((state) => state.video);
  const { width: videoWidth } = videoState;

  const { players, mockedPlayers } = useSelector((state) => state.players);

  const widgetWidth = videoWidth / 2;
  const widgetHeight = widgetWidth / 2;

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
              <Rect
                x={100}
                y={100}
                width={100}
                height={200}
                fill="yellow"
                opacity={leftCameraShowing ? 0.8 : 0.5}
                rotation={45}
                onClick={() => {
                  setLeftCameraShowing((current) => !current);
                  setRightCameraShowing(false);
                }}
              />
            )}
            {rightCamera && (
              <Rect
                x={widgetWidth - 160}
                y={190}
                width={100}
                height={200}
                fill="purple"
                opacity={rightCameraShowing ? 0.8 : 0.5}
                rotation={-45}
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
          onChange={() =>
            setPlayer(players[Math.floor(Math.random() * players.length)])
          }
        >
          {mockedPlayers.map((name, key) => (
            <option key={key}>{name}</option>
          ))}
          <option>Angle: Bottom-left</option>
          <option>Angle: Bottom-center</option>
          <option>Angle: Bottom-right</option>
        </Input>
      </Col>
    </Row>
  );
}
