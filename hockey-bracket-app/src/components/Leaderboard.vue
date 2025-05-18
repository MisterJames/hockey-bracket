<template>
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm text-left">
      <thead class="bg-gray-100 text-gray-700">
        <tr>
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Round 1</th>
          <th class="px-4 py-2">Round 2</th>
          <th class="px-4 py-2">Round 3</th>
          <th class="px-4 py-2">Round 4</th>
          <th class="px-4 py-2">Total</th>
          <th v-if="showFinalPick" class="px-4 py-2">Final Pick</th>
          <th v-if="showDelete" class="px-4 py-2"></th>
        </tr>
      </thead>
      <transition-group tag="tbody" name="fade" class="divide-y">
        <tr
          v-for="p in leaderboard.leaders"
          :key="p.id"
          class="bg-white group"
        >
          <td class="px-4 py-2 font-medium text-gray-800">
            {{ p.rank }}
            <span v-if="p.movement === 'up'">🔺</span>
            <span v-else-if="p.movement === 'down'">🔻</span>
          </td>
          <td class="px-4 py-2">{{ p.name }}</td>
          <td class="px-4 py-2 text-center">{{ p.round1 }}</td>
          <td class="px-4 py-2 text-center">{{ p.round2 }}</td>
          <td class="px-4 py-2 text-center">{{ p.round3 }}</td>
          <td class="px-4 py-2 text-center">{{ p.round4 }}</td>
          <td class="px-4 py-2 text-center font-bold">{{ p.total }}</td>

          <td v-if="showFinalPick" class="whitespace-nowrap px-4 py-2 text-sm text-gray-900 flex items-center gap-2">
            <template v-if="picksMap[p.id]">
              <img :src="picksMap[p.id].logo" :alt="picksMap[p.id].id" class="h-5 w-5 inline-block" />
              <span class="text-gray-600">
                beats
              </span>
              <template v-if="runnerUpMap[p.id]">
                <img :src="runnerUpMap[p.id].logo" :alt="runnerUpMap[p.id].id" class="h-5 w-5 inline-block" />
              </template>
              <template v-else>
                <span class="italic text-gray-400">(TBD)</span>
              </template>
            </template>
          </td>
          <td v-if="showDelete" class="px-4 py-2 text-center">
            <button
              @click="confirmDelete(p)"
              class="text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              title="Delete participant"
            >🗑</button>
          </td>
        </tr>
      </transition-group>
    </table>

    <div class="text-sm text-gray-500 mt-4" v-if="leaderboard.lastUpdated">
      Updated {{ formatDate(leaderboard.lastUpdated) }}
    </div>

    <ConfirmModal
      v-if="deleteModal.visible"
      :show="deleteModal.visible"
      :message="`Delete participant '${deleteModal.participant?.name}'? This cannot be undone.`"
      @confirm="deleteParticipant"
      @cancel="deleteModal.visible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLeaderboardStore } from '@/store/leaderboardStore'
import { useParticipantStore } from '@/store/participantStore'
import ConfirmModal from '@/components/ConfirmModal.vue'

const props = defineProps({
  showFinalPick: {
    type: Boolean,
    default: false
  },
  showDelete: {
    type: Boolean,
    default: false
  }
})

const leaderboard = useLeaderboardStore()
const participants = useParticipantStore()

const picksMap = computed(() => {
  const map = {}
  participants.participants.forEach(p => {
    const final = p.picks?.final?.[0]
    if (final) {
      map[p.id] = final
    }
  })
  return map

})

const runnerUpMap = computed(() => {
  const map = {}
  participants.participants.forEach(p => {
    const west = p.picks?.west?.[2]?.[0]
    const east = p.picks?.east?.[2]?.[0]
    const final = p.picks?.final?.[0]

    if (!west || !east || !final) return

    const runnerUp = final.id === west.id ? east : west
    if (runnerUp) map[p.id] = runnerUp
  })
  return map
})


function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

// Delete participant logic
const deleteModal = ref({
  visible: false,
  participant: null
})

function confirmDelete(participant) {
  deleteModal.value.participant = participant
  deleteModal.value.visible = true
}

function deleteParticipant() {
  if (deleteModal.value.participant) {
    console.log('Deleting participant:', deleteModal.value.participant.id)
    participants.deleteParticipant(deleteModal.value.participant.id)
    deleteModal.value.participant = null
  } else {
    console.log('No participant to delete')
  }
  deleteModal.value.visible = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
