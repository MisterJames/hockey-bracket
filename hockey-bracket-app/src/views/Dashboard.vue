<template>
  <div class="flex justify-center">
    <div class="w-full max-w-7xl mx-auto p-4 space-y-4">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div class="flex gap-2 flex-wrap">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="showModal = true">
            + Add Participant
          </button>
          <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            @click="participantStore.deleteAllParticipants()">
            🗑 Delete All Participants
          </button>
          <button class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            @click="bracketStore.resetBracket()">
            🔄 Reset Bracket
          </button>
          <button class="bg-slate-500 text-white px-3 py-2 rounded hover:bg-slate-600" @click="openPrintView">
            🖨 Print View
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-9 gap-4 items-start">
        <!-- left side -->
        <div class="md:col-span-5">
          <PlayoffBracket />
        </div>
        <!-- right side -->
        <div class="md:col-span-4">
          <Leaderboard :showDelete="true" />
        </div>
      </div>

      <!-- Participant Modal -->
      <ParticipantModal v-if="showModal" @confirm="handleParticipantConfirm" @cancel="showModal = false" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useParticipantStore } from '@/store/participantStore'
import { useBracketStore } from '@/store/bracketStore'
import ParticipantModal from '@/components/ParticipantModal.vue'
import Leaderboard from '@/components/Leaderboard.vue'
import PlayoffBracket from '@/components/PlayoffBracket.vue'

const showModal = ref(false)
const participantStore = useParticipantStore()
const bracketStore = useBracketStore()
const router = useRouter()

function handleParticipantConfirm(name) {
  const id = participantStore.addParticipant(name)
  showModal.value = false
  router.push(`/picks/${id}`)
}

function openPrintView() {
  window.open('/leaderboard', '_blank')
}

// Check if the active element is a form field
function isFormInputFocused() {
  const tag = document.activeElement?.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

function handleGlobalKeydown(e) {
  if (e.key === '=' && !isFormInputFocused() && !showModal.value) {
    e.preventDefault()
    showModal.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>
