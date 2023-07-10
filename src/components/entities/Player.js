import { Circle, Text } from "react-konva";

/**
 *  Drawsm player representation into the canvas
 *
 * @returns player representation
 */
function Player({ x, y, color, num }) {
  return [
    <Circle x={x} y={y} radius={4} stroke={color} fill={color} />,
    <Text x={x - 5} y={y - 5} fill="white" />,
  ];
}

export default Player;
