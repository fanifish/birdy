import { Circle, Text } from "react-konva";

/**
 *  Drawsm player representation into the canvas
 *
 * @returns player representation
 */
function Player({ x, y, teamColor, num }) {
  return [
    <Circle x={x} y={y} radius={12} stroke={teamColor} fill={teamColor} />,
    <Text x={x - 5} y={y - 5} text={"" + num} fill="white" />,
  ];
}

export default Player;
