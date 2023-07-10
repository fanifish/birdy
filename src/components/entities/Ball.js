import { Circle } from "react-konva";
import React from "react";
import Konva from "konva";

/**
 * Handles rendering the ball.
 *
 * @param {pos} position of the ball to render
 * @returns
 */
function Ball({ pos, px, py, width, height }) {
  const outerCircleRef = React.useRef();

  React.useEffect(() => {
    var period = 200;

    var anim = new Konva.Animation((frame) => {
      outerCircleRef.current.opacity((Math.sin(frame.time / period) + 1) / 2);
    }, outerCircleRef.current.getLayer());

    anim.start();
    return () => {
      anim.stop();
    };
  }, []);

  return [
    <Circle
      x={px + pos.x * width}
      y={py + pos.y * height}
      radius={8}
      stroke="purple"
      fill={"white"}
    />,
    <Circle
      x={px + pos.x * width}
      y={py + pos.y * height}
      radius={15}
      stroke="purple"
      ref={outerCircleRef}
    />,
  ];
}

export default Ball;
