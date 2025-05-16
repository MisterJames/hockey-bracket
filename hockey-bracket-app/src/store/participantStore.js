import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { watch } from 'vue';

export const useParticipantStore = defineStore('participants', {
    state: () => {
        const saved = localStorage.getItem('participantState');
        const defaultState = { participants: [] };
        try {
          return Object.assign(defaultState, JSON.parse(saved));
        } catch (e) {
          return defaultState;
        }
      }
      ,

  actions: {
    addParticipant(name) {
      const id = nanoid();
      this.participants.push({
        id,
        name,
        picks: {
          west: [],
          east: [],
          final: [],
          finalPick: null
        }
      });
      return id;
    },

    deleteAllParticipants() {
      this.participants = [];
    },

    getParticipant(id) {
      return this.participants.find(p => p.id === id);
    }
  }
});
