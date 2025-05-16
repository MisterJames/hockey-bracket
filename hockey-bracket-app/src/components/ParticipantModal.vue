<template>
    <div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add Participant</h2>
        <form @submit.prevent="handleConfirm">
          <input
            ref="inputRef"
            v-model="name"
            type="text"
            class="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter name"
          />
          <div class="flex justify-end gap-2">
            <button type="button" @click="$emit('cancel')" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Picks
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  
  const name = ref('')
  const inputRef = ref(null)
  
  const emit = defineEmits(['confirm', 'cancel'])
  
  function handleConfirm() {
    if (name.value.trim()) {
      emit('confirm', name.value.trim())
      name.value = ''
    }
  }
  
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      emit('cancel')
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
    nextTick(() => inputRef.value?.focus())
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
  </script>
  