// src/store/bracketStore.js
import { defineStore } from 'pinia'
import { generateNHLBracket } from '@/logic/bracketGenerator'

function loadPersistedBracket() {
  const saved = localStorage.getItem('bracketState')
  return saved ? JSON.parse(saved) : null
}

export const useBracketStore = defineStore('bracket', {
  state: () => {
    const saved = loadPersistedBracket()
    return saved || {
      configured: false,
      teams: { east: [], west: [] },
      matchups: { east: [], west: [] },
      roundWins: {},
    }
  },


  getters: {
    isBracketConfigured: (state) =>
      Array.isArray(state.teams.east) &&
      Array.isArray(state.teams.west) &&
      state.teams.east.length === 8 &&
      state.teams.west.length === 8,

    activeTeams: (state) => {
      // Collect all teams
      const allTeams = [...state.teams.east, ...state.teams.west];
      // If no roundWins, all teams are active
      if (!state.roundWins || Object.keys(state.roundWins).length === 0) return allTeams;

      const eliminated = new Set();

      // For each conference and each round, check matchups
      ['east', 'west'].forEach(conf => {
        const matchups = state.matchups[conf] || [];
        for (let round = 0; round < matchups.length; round++) {
          const roundMatchups = matchups[round] || [];
          roundMatchups.forEach(match => {
            // Defensive: skip if match or teams are missing
            if (!match || !match.teamA || !match.teamB) return;
            const teamA = match.teamA;
            const teamB = match.teamB;
            // Defensive: skip if teamA or teamB is null
            if (!teamA || !teamB) return;
            const winsA = state.roundWins[teamA.id]?.[round] || 0;
            const winsB = state.roundWins[teamB.id]?.[round] || 0;
            if (winsA === 4) eliminated.add(teamB.id);
            if (winsB === 4) eliminated.add(teamA.id);
          });
        }
      });

      // Return teams that are not eliminated and are not null
      return allTeams.filter(team => team && team.id && !eliminated.has(team.id));
    }
  }

  ,

  actions: {
    configureBracket(eastTeams, westTeams) {
      this.teams.east = eastTeams
      this.teams.west = westTeams

      const matchups = generateNHLBracket(eastTeams, westTeams)
      this.matchups.east = matchups.east
      this.matchups.west = matchups.west

      // Initialize win tracker
      const allTeams = [...eastTeams, ...westTeams]
      allTeams.forEach(team => {
        this.roundWins[team.id] = [0, 0, 0, 0]
      })

      localStorage.setItem('bracketState', JSON.stringify(this.$state))

      this.configured = true
    },

    updateWinCount(teamId, round, winCount) {
      if (!this.roundWins[teamId]) return
      const updated = [...this.roundWins[teamId]]
      updated[round] = winCount
      this.roundWins[teamId] = updated // This triggers reactivity
      localStorage.setItem('bracketState', JSON.stringify(this.$state))
    },


    resetBracket() {
      this.configured = false
      this.teams.east = []
      this.teams.west = []
      this.matchups.east = []
      this.matchups.west = []
      this.roundWins = {}

      localStorage.removeItem('bracketState')
      localStorage.setItem('bracketState', JSON.stringify(this.$state))
    },
  },
})
