<template>
    <div class="p-4 space-y-4">
      <!-- Action Buttons -->
      <div class="flex space-x-4">
        <button
  class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  @click="showParticipantModal = true"
>
  ➕ Add Participant
</button>

        <button
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          @click="deleteAllParticipants"
        >
          🗑️ Delete All Participants
        </button>
        <button
          class="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
          @click="resetBracket"
        >
          ♻️ Reset Bracket
        </button>
      </div>
  
      <!-- Main Content: Bracket + Leaderboard -->
      <div class="flex space-x-8">
        <div class="w-2/3">
          <PlayoffBracket />
        </div>
        <div class="w-1/3">
          <Leaderboard />
        </div>
      </div>
  
      <ParticipantModal v-if="showParticipantModal" @cancel="showParticipantModal = false" />

      <ConfirmModal
        :show="showResetConfirm"
        message="Are you sure you want to reset the bracket?"
        @confirm="confirmReset"
        @cancel="cancelReset"
      />
    </div>
  </template>
  
  <script setup>
  import PlayoffBracket from '@/components/PlayoffBracket.vue';
  import Leaderboard from '@/components/Leaderboard.vue';
  import ConfirmModal from '@/components/ConfirmModal.vue';
  import ParticipantModal from '@/components/ParticipantModal.vue';

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBracketStore } from '@/store/bracketStore';
  
  const store = useBracketStore();
  const router = useRouter();
  const showResetConfirm = ref(false);
  const showParticipantModal = ref(false);

 
  function deleteAllParticipants() {
    alert('Delete All Participants clicked!');
  }
  
  function resetBracket() {
    showResetConfirm.value = true;
  }
  
  function confirmReset() {
    store.resetBracket();
    showResetConfirm.value = false;
    router.push('/setup');
  }
  
  function cancelReset() {
    showResetConfirm.value = false;
  }
  </script>
  