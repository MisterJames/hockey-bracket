<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
        <h2 class="text-lg font-bold mb-4">Add Participant</h2>
  
        <input
          v-model="name"
          type="text"
          placeholder="Enter your name"
          class="border border-gray-300 rounded px-4 py-2 w-full mb-4"
        />
  
        <div class="flex justify-end space-x-2">
          <button @click="$emit('cancel')" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancel</button>
          <button
            :disabled="!name.trim()"
            @click="submit"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Start Picks
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useParticipantStore } from '@/store/participantStore'; // to be created
  
  const emit = defineEmits(['cancel']);
  const name = ref('');
  const router = useRouter();
  const store = useParticipantStore();
  
  function submit() {
    const id = store.addParticipant(name.value.trim());
    emit('cancel'); // Close modal
    router.push(`/picks/${id}`);
  }
  </script>
  