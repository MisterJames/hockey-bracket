<template>
  <div class="bracket-column">
    <div v-for="(slot, i) in paddedMatchups" :key="i" class="relative" :style="getSlotStyle(i)">
      <div v-if="slot === null" class="flex-grow" aria-hidden="true"></div>

      <div v-else class="border p-2 text-sm rounded shadow text-center bg-white">
        <div v-if="slot.teamA && slot.teamB" class="flex flex-col gap-1">
          <div :class="[winnerClass(slot, 'A'), eliminatedClass(slot, 'A')]"
            class="flex items-center justify-center gap-2">
            <img :src="slot.teamA.logo" alt="A" class="h-6 w-6 object-contain" :style="eliminatedStyle(slot, 'A')" />
            <span class="text-xs font-mono text-gray-600">{{ slot.teamA.id }}</span>
            <span>{{ getWins(slot.teamA.id) }}</span>
          </div>
          <div :class="[winnerClass(slot, 'B'), eliminatedClass(slot, 'B')]"
            class="flex items-center justify-center gap-2">
            <img :src="slot.teamB.logo" alt="B" class="h-6 w-6 object-contain" :style="eliminatedStyle(slot, 'B')" />
            <span class="text-xs font-mono text-gray-600">{{ slot.teamB.id }}</span>
            <span>{{ getWins(slot.teamB.id) }}</span>
          </div>
        </div>
        <div v-else class="text-gray-400 italic">Waiting for opponent</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBracketStore } from '@/store/bracketStore'

const props = defineProps({
  region: String, // 'west', 'east', or 'final'
  round: Number,
  reverse: Boolean
})

const bracket = useBracketStore()

const matchups = computed(() => {
  if (props.region === 'final') {
    return bracket.matchups?.final ? [bracket.matchups.final] : []
  }
  const group = bracket.matchups?.[props.region]
  if (!group || !group[props.round]) return []
  return props.reverse ? [...group[props.round]].reverse() : group[props.round]
})

const paddedMatchups = computed(() => {
  if (props.round === 0) return matchups.value
  const totalSlots = Math.pow(2, 4 - props.round) // always 8 slots across 4 rounds
  const slotList = Array(totalSlots).fill(null)
  for (let i = 0; i < matchups.value.length; i++) {
    const slotIndex = (i * 2) + 1
    slotList[slotIndex] = matchups.value[i]
  }
  return slotList
})

function getSlotStyle(index) {
  if (props.round === 3 && index === 0) {
    return { marginTop: '1.5rem' }
  }
  return {}
}

function winnerClass(match, side) {
  const winner = match?.winner?.id
  const team = side === 'A' ? match?.teamA?.id : match?.teamB?.id
  return winner === team ? 'font-bold text-green-700' : ''
}

function getWins(teamId) {
  if (!teamId || !bracket.roundWins[teamId]) return 0
  return bracket.roundWins[teamId][props.round] ?? 0
}

function eliminatedClass(match, side) {
  const winner = match?.winner?.id
  const team = side === 'A' ? match?.teamA?.id : match?.teamB?.id
  return winner && team !== winner ? 'line-through text-gray-500' : ''
}

function eliminatedStyle(match, side) {
  const winner = match?.winner?.id
  const team = side === 'A' ? match?.teamA?.id : match?.teamB?.id
  return winner && team !== winner ? { opacity: 0.5 } : {}
}
</script>

<style scoped>
.bracket-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>