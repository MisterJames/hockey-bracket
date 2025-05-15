import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export const useParticipantStore = defineStore('participants', {
  state: () => ({
    participants: []
  }),

  actions: {
    addParticipant(name) {
      const id = nanoid();
      this.participants.push({
        id,
        name,
        picks: {
          west: [],
          east: [],
          final: []
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
