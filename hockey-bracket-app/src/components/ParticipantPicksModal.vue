<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-14 rounded shadow-lg max-w-6xl w-full relative">
      <h2 class="text-xl font-bold mb-4 text-center">Picks for {{ participant?.name }}</h2>
      <div class="grid grid-cols-2 gap-10">
        <div v-for="side in ['west', 'east']" :key="side">
          <h3 class="text-lg font-semibold mb-4 capitalize">{{ side }}ern Conference</h3>
          <div class="flex space-x-6">
            <div v-for="(round, roundIndex) in picks[side]" :key="roundIndex" class="flex flex-col space-y-4">
              <div class="text-sm text-gray-500 font-medium text-center">
                Round {{ roundIndex + 1 }}
              </div>
              <div v-for="(selected, matchIndex) in round" :key="matchIndex" class="space-y-2">
                <div
                  v-if="selected"
                  class="w-32 flex items-center justify-between px-2 py-2 border rounded bg-gray-100"
                >
                  <div class="flex items-center space-x-2">
                    <img
                      :src="selected.logo"
                      class="w-6 h-6"
                      :style="{ opacity: isEliminated(selected.id) ? 0.5 : 1 }"
                    />
                    <span
                      class="font-mono text-sm"
                      :class="{ 'line-through text-gray-400': isEliminated(selected.id) }"
                    >{{ selected.id }}</span>
                  </div>
                </div>
                <div v-else class="w-32 px-2 py-2 border rounded text-gray-400 italic bg-gray-50">
                  No pick
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FINAL ROUND -->
      <div class="mt-10">
        <h3 class="text-lg font-semibold mb-2">Stanley Cup Final</h3>
        <div class="flex space-x-4">
          <div
            v-if="picks.final[0]"
            class="w-32 flex items-center justify-between px-2 py-2 border rounded bg-gray-100"
          >
            <div class="flex items-center space-x-2">
              <img
                :src="picks.final[0].logo"
                class="w-6 h-6"
                :style="{ opacity: isEliminated(picks.final[0].id) ? 0.5 : 1 }"
              />
              <span
                class="font-mono text-sm"
                :class="{ 'line-through text-gray-400': isEliminated(picks.final[0].id) }"
              >{{ picks.final[0].id }}</span>
            </div>
          </div>
          <div v-else class="w-32 px-2 py-2 border rounded text-gray-400 italic bg-gray-50">
            No pick
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <button class="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700" @click="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBracketStore } from '@/store/bracketStore'

const props = defineProps({
  show: Boolean,
  participant: Object
})

const picks = computed(() => props.participant?.picks ?? {
  west: [[null, null, null, null], [null, null], [null]],
  east: [[null, null, null, null], [null, null], [null]],
  final: [null]
})

const bracketStore = useBracketStore()
const activeTeams = computed(() => bracketStore.activeTeams.map(t => t.id))

function isEliminated(teamId) {
  // If not in activeTeams, it's eliminated
  return !activeTeams.value.includes(teamId)
}
</script>
