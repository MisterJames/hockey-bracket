import { defineStore } from 'pinia'
import { calculatePoints } from '@/logic/calculatePoints'

function loadPreviousRanks() {
  const saved = localStorage.getItem('leaderboardPreviousRanks')
  return saved ? JSON.parse(saved) : {}
}

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    leaders: [],
    previousRanks: loadPreviousRanks(),
    lastUpdated: null
  }),

  actions: {
    recompute(participants, roundWins) {
      const currentRanks = {}
      this.leaders.forEach((p, i) => {
        currentRanks[p.id] = i
      })

      const scored = participants.map(p => {
        const points = calculatePoints(p.picks, roundWins)
        return { id: p.id, name: p.name, ...points }
      })

      const sorted = scored.sort((a, b) => b.total - a.total)

      const withMovement = sorted.map((p, i) => {
        const prevIndex = this.previousRanks[p.id]
        let movement = null

        if (prevIndex !== undefined) {
          if (prevIndex > i) movement = 'up'
          else if (prevIndex < i) movement = 'down'
          else movement = 'same'
        } else {
          movement = 'new'
        }

        return {
          ...p,
          movement,
          rank: i + 1
        }
      })

      this.leaders = withMovement
      this.lastUpdated = new Date()


      // 🔒 Save current order as new previousRanks
      const updatedRanks = {}
      withMovement.forEach((p, i) => {
        updatedRanks[p.id] = i
      })
      this.previousRanks = updatedRanks
      localStorage.setItem('leaderboardPreviousRanks', JSON.stringify(updatedRanks))
    }
  }
})
