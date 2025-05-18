/**
 * Generate full multi-round bracket structure
 * @param {Array} eastTeams 
 * @param {Array} westTeams 
 * @returns {Object} 
 */
export function generateNHLBracket(eastTeams, westTeams) {
  return {
    east: [generateRoundMatchups(eastTeams)],
    west: [generateRoundMatchups(westTeams)],
    final: [[]] // Round 4: Cup Final
  };
}

function generateRoundMatchups(teams) {
  const matchups = [];
  for (let i = 0; i < teams.length; i += 2) {
    matchups.push({
      teamA: teams[i],
      teamB: teams[i + 1],
      winsA: 0,
      winsB: 0,
      winner: null
    });
  }
  return matchups;
}
