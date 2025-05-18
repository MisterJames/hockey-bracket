// src/store/participantStore.js
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useParticipantStore = defineStore('participants', {
  state: () => {
    const saved = localStorage.getItem('participantState')
    const defaultState = { participants: [], loaded: false }

    try {
      const parsed = JSON.parse(saved)
      if (parsed?.participants) {
        defaultState.participants = parsed.participants
      }
    } catch (e) {
      console.warn('Failed to load participantState:', e)
    }

    defaultState.loaded = true
    return defaultState
  },

  actions: {
    addParticipant(name) {
      const id = nanoid()
      const newParticipant = {
        id,
        name,
        picks: {
          west: [],
          east: [],
          final: [],
          finalPick: null
        }
      }
      this.participants.push(newParticipant)
      localStorage.setItem('participantState', JSON.stringify({ participants: this.participants }))
      return id
    },

    deleteAllParticipants() {
      this.participants = []
      localStorage.setItem('participantState', JSON.stringify({ participants: this.participants }))
    },

    deleteParticipant(id) {
      this.participants = this.participants.filter(p => p.id !== id)
      localStorage.setItem('participantState', JSON.stringify({ participants: this.participants }))
    },

    getParticipant(id) {
      return this.participants.find(p => p.id === id)
    },

    saveParticipants() {
      localStorage.setItem('participantState', JSON.stringify({ participants: this.participants }))
    }
  }
})
