import { Circle, Text } from 'react-konva';

/**
 *  Drawsm player representation into the canvas
 * 
 * @returns player representation
 */
function Player({ pos, teamColor, num, px, py}) {
    return [
        <Circle
            x={px + pos.x}
            y={py + pos.y}
            radius={12}
            stroke={teamColor}
            fill={teamColor}
        />,
        <Text
            x={px + pos.x - 5}
            y={py + pos.y - 5}
            text={""+num}
            fill="white"
        />
    ];
}

export default Player;