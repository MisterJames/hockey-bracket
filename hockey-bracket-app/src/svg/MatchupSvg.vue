<template>
  <g :transform="`translate(${x}, ${y})`">
    <rect :width="width" :height="height" rx="6" ry="6" fill="#fff" :stroke="isCurrent ? '#2ecc71' : '#333'"
      :stroke-width="isCurrent ? 3 : 1" filter="url(#drop-shadow)" />


    <TeamSvg :team="match.teamA" :winner="match.winner" :round="round" :x="4"
      :y="(height / 2 - lineHeight * 1.5) - 4" />

    <TeamSvg :team="match.teamB" :winner="match.winner" :round="round" :x="4" :y="height / 2 + lineHeight / 2" />
  </g>
</template>


<script setup>
import { useBracketStore } from '@/store/bracketStore'
import TeamSvg from '@/svg/TeamSvg.vue'
import { computed } from 'vue'

const isCurrent = computed(() => {
  const a = props.match?.teamA?.id
  const b = props.match?.teamB?.id
  const winner = props.match?.winner?.id
  // current if neither team is eliminated
  return a && b && (!winner || (winner !== a && winner !== b))
})

const props = defineProps({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  match: Object,
  round: Number
})

const bracket = useBracketStore()
const lineHeight = 12

function getWins(teamId) {
  return bracket.roundWins?.[teamId]?.[props.round] ?? 0
}




function isEliminated(side) {
  const winnerId = props.match?.winner?.id
  const team = side === 'A' ? props.match?.teamA : props.match?.teamB
  return winnerId && team?.id !== winnerId
}
</script>

<style scoped>
.team-text {
  font-size: 12px;
  font-family: sans-serif;
  fill: #222;
}

.eliminated {
  text-decoration: line-through;
  fill: #888;
}
</style>