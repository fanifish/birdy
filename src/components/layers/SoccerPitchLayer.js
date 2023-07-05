import { Rect, Line, Circle, Arc } from 'react-konva';

/**
 * Constants used for rendering the pitch.
 */
const goalSemiCircleRadius = 20;

/**
 * Layer representing a soccer pitch
 * @param parent wi
 * @returns soccer pitch layer.
 */
function SoccerPitch({ px, py, width, height }) {

  return [
    // <Rect
    //   x={px}
    //   y={py}
    //   width={width}
    //   height={height}
    //   fill="green"
    //   shadowBlur={10}
    // />,
    <Line
      x={px}
      y={py}
      points={[0, 0, width, 0, width, height, 0, height, 0, 0]}
      stroke={"white"}
      strokeWidth={3}
    />,
    <Line
      x={px}
      y={py}
      points={[width / 2, 0, width / 2, height]}
      stroke={"white"}
      strokeWidth={3}
    />,
    <Circle
      x={px + (width / 2)}
      y={py + (height / 2)}
      radius={(10.0 / 90) * height}
      stroke={"white"}
    />,
    <Line
      x={px}
      y={py}
      points={get_goal_lines(width, height, 'left')}
      stroke={"white"}
      strokeWidth={3}
    />,
    <Line
      x={px}
      y={py}
      points={get_goal_lines(width, height, 'right')}
      stroke={"white"}
      strokeWidth={3}
    />,
    <Line
      x={px}
      y={py}
      points={get_inner_goal_lines(width, height, 'left')}
      stroke={"white"}
      strokeWidth={3}
    />,
    <Line
      x={px}
      y={py}
      points={get_inner_goal_lines(width, height, 'right')}
      stroke={"white"}
      strokeWidth={3}
    />,
    <Arc
      x={px + ((18.0 / 130) * width)}
      y={py + ((45.0 / 90) * height)}
      stroke="white"
      angle={180}
      rotationDeg={-90}
      innerRadius={goalSemiCircleRadius}
      outerRadius={goalSemiCircleRadius}
    />,
    <Arc
      x={px + (width - ((18.0 / 130) * width))}
      y={py + ((45.0 / 90) * height)}
      stroke="white"
      angle={180}
      rotationDeg={90}
      innerRadius={goalSemiCircleRadius}
      outerRadius={goalSemiCircleRadius}
    />
  ];
}

function get_goal_lines(width, height, side) {

  const marginX = (18.0 / 130) * width;
  const marginY = (23.0 / 90) * height;

  if (side == 'left') {
    return [0, marginY, marginX, marginY, marginX, height - marginY, 0, height - marginY];
  } else if (side == 'right') {
    return [width, marginY, width - marginX, marginY, width - marginX, height - marginY, width, height - marginY];
  }

  throw Error("Unknown input for goal line side = " + side);
}

function get_inner_goal_lines(width, height, side) {

  const marginX = (6.0 / 130) * width;
  const marginY = (35.0 / 90) * height;

  if (side == 'left') {
    return [0, marginY, marginX, marginY, marginX, height - marginY, 0, height - marginY];
  } else if (side == 'right') {
    return [width, marginY, width - marginX, marginY, width - marginX, height - marginY, width, height - marginY];
  }

  throw Error("Unknown input for goal line side = " + side);
}

export default SoccerPitch;