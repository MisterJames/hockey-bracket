// src/store/leaderboardStore.js
import { defineStore } from 'pinia'
import { watch } from 'vue'
import { useParticipantStore } from './participantStore'
import { useBracketStore } from './bracketStore'
import { calculatePoints } from '@/logic/calculatePoints'

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    leaders: []
  }),

  actions: {
    recompute(participants, roundWins) {
      this.leaders = participants.map(p => {
        const { round1, round2, round3, round4, total } = calculatePoints(p.picks, roundWins)
        return {
          id: p.id,
          name: p.name,
          round1,
          round2,
          round3,
          round4,
          total
        }
      }).sort((a, b) => b.total - a.total) // descending order
    }
  }
})
