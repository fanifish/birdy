import Player from "./Player";

/**
 * Renders team information into bridy
 * @param {players} list of players
 * @param {teamColor} the team color
 * @returns list of player renderings
 */
function Team({players, teamColor}, px, py) {
    return players.map(player => <Player pos={player.pos} teamColor={teamColor} num={player.num} px={px} py={py}/>);
}

export default Team;