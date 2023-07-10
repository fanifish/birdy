import Player from "./Player";

/**
 * Renders team information into bridy
 * @param {players} list of players
 * @param {teamColor} the team color
 * @returns list of player renderings
 */
function Team({ players, teamColor, px, py, width, height }) {
  return (
    <>
      {players.map((player, key) => {
        const x = px + player.pos.x * width;
        const y = py + player.pos.y * height;
        return (
          <Player
            key={key}
            x={x}
            y={y}
            teamColor={teamColor}
            num={player.num}
          />
        );
      })}
    </>
  );
}

export default Team;
