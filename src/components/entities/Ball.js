import { Circle } from "react-konva";
import React from "react";
import Konva from "konva";

/**
 * Handles rendering the ball.
 *
 * @param {pos} position of the ball to render
 * @returns
 */
function Ball({ x, y }) {
  const outerCircleRef = React.useRef();

  React.useEffect(() => {
    const period = 200;

    const anim = new Konva.Animation((frame) => {
      outerCircleRef.current?.opacity((Math.sin(frame.time / period) + 1) / 2);
    }, outerCircleRef.current?.getLayer());

    anim.start();
    return () => {
      anim.stop();
    };
  }, []);

  return [
    <Circle x={x} y={y} radius={5} stroke="purple" fill={"white"} />,
    <Circle x={x} y={y} radius={15} stroke="purple" ref={outerCircleRef} />,
  ];
}

export default Ball;
