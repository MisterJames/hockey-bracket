// src/logic/calculatePoints.js

const ROUND_MULTIPLIERS = [1, 2, 3, 4];

/**
 * Compute score for a single participant based on their picks and the actual win data.
 * @param {object} picks - Participant picks (west, east, final)
 * @param {object} roundWins - Map of teamId => [r1, r2, r3, r4] win counts
 * @returns {{ round1: number, round2: number, round3: number, round4: number, total: number }}
 */
export function calculatePoints(picks, roundWins) {
  const roundTotals = [0, 0, 0, 0];

  const processSeries = (seriesArray, roundIndex) => {
    seriesArray.forEach(team => {
      const teamId = team.id;
      const wins = roundWins[teamId]?.[roundIndex] || 0;
      roundTotals[roundIndex] += wins * ROUND_MULTIPLIERS[roundIndex];
    });
  };

  // Each round in each conference
  for (let r = 0; r < 3; r++) {
    (picks.west?.[r] || []).forEach(team => processSeries([team], r));
    (picks.east?.[r] || []).forEach(team => processSeries([team], r));
  }

  // Final round
  (picks.final || []).forEach(team => processSeries([team], 3));

  const total = roundTotals.reduce((sum, val) => sum + val, 0);

  return {
    round1: roundTotals[0],
    round2: roundTotals[1],
    round3: roundTotals[2],
    round4: roundTotals[3],
    total,
  };
}
