<template>
    <div class="p-4 bg-white shadow-md rounded-xl">
      <h2 class="text-xl font-bold mb-4">🏆 Leaderboard</h2>
      <table class="w-full text-sm text-left border-collapse">
        <thead>
          <tr class="border-b">
            <th class="py-2">#</th>
            <th class="py-2">Name</th>
            <th class="py-2">R1</th>
            <th class="py-2">R2</th>
            <th class="py-2">R3</th>
            <th class="py-2">R4</th>
            <th class="py-2 font-bold">Total</th>
          </tr>
        </thead>
  
        <transition-group tag="tbody" name="slide" class="divide-y divide-gray-100">
          <tr
            v-for="(player, index) in leaderboard.leaders"
            :key="player.id"
            :class="[
                    highlights[player.id] === 'up' ? 'flash-up' :
                    highlights[player.id] === 'down' ? 'flash-down' : ''
                    ]"
          >
            <td class="py-1 px-2 flex items-center gap-1">
              <span>{{ index + 1 }}</span>
              <span v-if="player.movement === 'up'">🔺</span>
              <span v-else-if="player.movement === 'down'">🔻</span>
              <span v-else-if="index === 0 && player.movement !== 'same'">🔥</span>
            </td>
            <td class="py-1 px-2">{{ player.name }}</td>
            <td class="py-1 px-2 text-center">{{ player.round1 }}</td>
            <td class="py-1 px-2 text-center">{{ player.round2 }}</td>
            <td class="py-1 px-2 text-center">{{ player.round3 }}</td>
            <td class="py-1 px-2 text-center">{{ player.round4 }}</td>
            <td class="py-1 px-2 text-center font-bold">{{ player.total }}</td>
          </tr>
          <tr v-if="leaderboard.leaders.length === 0" key="empty">
            <td colspan="7" class="text-center py-4 text-gray-500">
              No participants yet.
            </td>
          </tr>
        </transition-group>
      </table>
      <p class="text-right text-xs text-gray-500 mt-2" v-if="leaderboard.lastUpdated">
        Updated {{ formatDate(leaderboard.lastUpdated) }}
    </p>

    </div>
  </template>
  
  <script setup>
  import { useLeaderboardStore } from '@/store/leaderboardStore'
import { ref, watch } from 'vue'

const leaderboard = useLeaderboardStore()
const highlights = ref({})

function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

watch(
  () => leaderboard.leaders.map(p => p.id),
  (ids) => {
    ids.forEach(id => {
      const movement = leaderboard.leaders.find(p => p.id === id)?.movement
      if (movement === 'up' || movement === 'down') {
        highlights.value[id] = movement
        setTimeout(() => {
          delete highlights.value[id]
        }, 2000)
      }
    })
  },
  { immediate: true }
)

  </script>
  
  <style scoped>
.slide-move {
  transition: transform 0.4s ease;
}

.flash-up {
  background-color: #d1fae5; /* Tailwind green-100 */
  transition: background-color 0.5s ease-out;
}

.flash-down {
  background-color: #fee2e2; /* Tailwind red-100 */
  transition: background-color 0.5s ease-out;
}
  </style>
  