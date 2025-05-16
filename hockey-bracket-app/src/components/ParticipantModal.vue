<template>
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2 class="text-lg font-bold mb-4">Add Participant</h2>
        <form @submit.prevent="handleConfirm">
          <input
            ref="inputRef"
            v-model="name"
            type="text"
            class="w-full p-2 border rounded mb-4"
            placeholder="Enter name"
          />
          <div class="flex justify-end gap-2">
            <button type="button" @click="$emit('cancel')" class="btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              Start Picks
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, watch, nextTick } from 'vue'
  
  const name = ref('')
  const inputRef = ref(null)
  
  const emit = defineEmits(['confirm', 'cancel'])
  
  function handleConfirm() {
    if (name.value.trim()) {
      emit('confirm', name.value.trim())
      name.value = ''
    }
  }
  
  // Auto-focus input when modal is mounted or reopened
  onMounted(() => {
    nextTick(() => inputRef.value?.focus())
  })
  </script>
  