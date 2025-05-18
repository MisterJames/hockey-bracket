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
