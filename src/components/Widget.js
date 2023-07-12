import React, { useState } from "react";
import { Layer, Rect, Stage, Image } from "react-konva";
import useImage from "use-image";
import SoccerPitch from "./layers/SoccerPitchLayer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Input, Row} from "reactstrap";
import Player from "./entities/Player";

import PurpleCameraImage from '../images/purple_camera.png';
import YellowCameraImage from '../images/yellow_camera.png';
import {closeModal, openModal, updateHeatMapImage} from "../redux/slices/viewSlice";

export default function Widget() {
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.view);
  
  const [player, setPlayer] = useState(undefined);
  
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
    <Row className="text-neutral-50">
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
        </Stage>
      </Col>
      <Col>
        <div className="flex flex-col items-end">
          <p onClick={() => dispatch(closeModal())} className="bg-slate-800 hover:bg-slate-600 p-2 w-[40px] h-[40px] rounded-full text-center cursor-pointer transition-all select-none">X</p>
        </div>
        <h1 className="text-2xl font-light">Select Player Heatmap</h1>
        <Input
          type="select"
          value={player}
          onChange={handlePlayerChange}
        >
          {mockedPlayers.map((name, key) => (
            <option key={key}>{name}</option>
          ))}
        </Input>
        <p className="text-slate-500 text-sm pt-2">Selecting a player will show the players position heatmap for a given period of time</p>
      </Col>
    </Row>
  );
}
