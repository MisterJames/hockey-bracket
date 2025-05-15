// utils/bracketGenerator.js

/**
 * Generate full multi-round bracket structure
 * @param {Array} eastTeams - Ordered team array for East (8 teams)
 * @param {Array} westTeams - Ordered team array for West (8 teams)
 * @returns {Object} Bracket with west, east, and final
 */
export function generateNHLBracket(eastTeams, westTeams) {
  return {
    east: [generateRoundMatchups(eastTeams)],
    west: [generateRoundMatchups(westTeams)],
    final: [[]] // Round 4: Stanley Cup Final
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
