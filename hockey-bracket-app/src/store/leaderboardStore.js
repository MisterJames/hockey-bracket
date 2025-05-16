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
        console.log('[Leaderboard] Recomputing with', participants.length, 'participants')
        this.leaders = participants.map(p => {
          const points = calculatePoints(p.picks, roundWins)
          console.log(' ->', p.name, points)
          return {
            id: p.id,
            name: p.name,
            ...points
          }
        }).sort((a, b) => b.total - a.total)
      }
      
  }
})
