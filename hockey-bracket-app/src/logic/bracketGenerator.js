// utils/bracketGenerator.js

/**
 * Generate NHL playoff bracket matchups from manually entered round 1 pairings.
 *
 * @param {Array} easternMatchups - Array of 4 objects with { teamA, teamB } for the East
 * @param {Array} westernMatchups - Array of 4 objects with { teamA, teamB } for the West
 * @returns {Object} - Structured bracket data
 */
export function generateNHLBracket(easternMatchups, westernMatchups) {
  return {
    east: generateConferenceMatchups(easternMatchups),
    west: generateConferenceMatchups(westernMatchups),
  };
}

/**
 * Simply maps each matchup into a consistent structure.
 *
 * @param {Array} matchups - Array of { teamA, teamB }
 * @returns {Array} - Formatted matchups
 */
function generateConferenceMatchups(matchups) {
  return matchups.map(({ teamA, teamB }) => ({
    teamA,
    teamB,
    winsA: 0,
    winsB: 0,
  }));
}
