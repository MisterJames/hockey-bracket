// utils/bracketGenerator.js

/**
 * Generate NHL playoff bracket matchups from manually entered round 1 teams.
 * Assumes teams are entered in pairing order (e.g. [A1, A2, B1, B2, ...]).
 *
 * @param {Array} eastTeams - Flat array of 8 east team objects
 * @param {Array} westTeams - Flat array of 8 west team objects
 * @returns {Object} - Structured bracket with matchups per conference
 */
export function generateNHLBracket(eastTeams, westTeams) {
  return {
    east: generateConferenceMatchups(eastTeams),
    west: generateConferenceMatchups(westTeams),
  };
}

function generateConferenceMatchups(teams) {
  const matchups = [];
  for (let i = 0; i < teams.length; i += 2) {
    matchups.push({
      teamA: teams[i],
      teamB: teams[i + 1],
      winsA: 0,
      winsB: 0,
    });
  }
  return matchups;
}