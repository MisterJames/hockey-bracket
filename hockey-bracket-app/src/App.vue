<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 font-sans">
    <!-- Header -->
    <header class="bg-blue-900 text-white px-6 py-4 shadow-md">
      <h1 class="text-2xl font-bold">🏒 Hockey Bracket Tracker</h1>
    </header>

    <!-- Action Buttons -->
    <div class="flex justify-center gap-4 my-6">
      <button @click="addParticipant" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        ➕ Add Participant
      </button>
      <button @click="deleteAllParticipants" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        🗑️ Delete All Participants
      </button>
      <button @click="resetBracket" class="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">
        🔄 Reset Bracket
      </button>
    </div>

    <!-- Router View -->
    <main class="px-6 pb-12">
      <router-view />
    </main>

    <!-- Confirm Modal -->
    <ConfirmModal
      :show="showResetConfirm"
      message="Are you sure you want to reset the bracket?"
      @confirm="confirmReset"
      @cancel="cancelReset"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBracketStore } from '@/store/bracketStore'
import { useRouter } from 'vue-router'
import ConfirmModal from '@/components/ConfirmModal.vue'

const store = useBracketStore()
const router = useRouter()
const showResetConfirm = ref(false)

function addParticipant() {
  alert('Add Participant clicked!')
}

function deleteAllParticipants() {
  alert('Delete All Participants clicked!')
}

function resetBracket() {
  showResetConfirm.value = true
}

function confirmReset() {
  store.resetBracket()
  showResetConfirm.value = false
  router.push('/setup')
}

function cancelReset() {
  showResetConfirm.value = false
}
</script>

<style scoped>
/* You can add global styles here if needed */
</style>
