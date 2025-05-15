<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Welcome, {{ participant?.name }}</h2>
      <p class="text-gray-600 mb-6">Select your picks for each round:</p>
  
      <div v-if="participant">
        <pre class="bg-gray-100 p-4 rounded text-sm">
          {{ JSON.stringify(participant.picks, null, 2) }}
        </pre>
      </div>
      <div v-else>
        <p class="text-red-500">Participant not found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { useParticipantStore } from '@/store/participantStore';
  
  const route = useRoute();
  const store = useParticipantStore();
  
  const participantId = route.params.id;
  const participant = store.getParticipant(participantId);
  </script>
  