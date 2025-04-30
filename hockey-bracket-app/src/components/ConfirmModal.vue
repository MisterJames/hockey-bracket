<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center">
        <p class="text-lg mb-4">{{ message }}</p>
        <div class="flex justify-center gap-4">
          <button @click="$emit('confirm')" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Yes
          </button>
          <button @click="$emit('cancel')" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    show: Boolean,
    message: {
      type: String,
      default: 'Are you sure?',
    }
  })
  defineEmits(['confirm', 'cancel'])
  </script>
  