<template>
    <g :transform="`translate(${x}, ${y})`">
      <image
        v-if="team?.logo"
        :href="team.logo"
        x="4"
        y="2"
        width="16"
        height="16"
        :opacity="isEliminated ? 0.5 : 1"
      />
      <text x="24" y="12" class="team-text" :class="{ eliminated: isEliminated }">
        {{ team?.id ?? 'TBD' }}
        <template v-if="team?.id">
          ({{ getWins(team.id) }})
        </template>
      </text>
    </g>
  </template>
  
  <script setup>
  import { useBracketStore } from '@/store/bracketStore'
  import { computed } from 'vue'

  const props = defineProps({
    team: Object,
    winner: Object,
    round: Number,
    x: Number,
    y: Number
  })
  
  const bracket = useBracketStore()
  
  const isEliminated = computed(() =>
    props.winner?.id && props.team?.id !== props.winner?.id
  )
  
  function getWins(teamId) {
    return bracket.roundWins?.[teamId]?.[props.round] ?? 0
  }
  </script>
  
  <style scoped>
  .team-text {
    font-size: 12px;
    font-family: sans-serif;
    fill: #222;
    dominant-baseline: middle;
  }
  .eliminated {
    text-decoration: line-through;
    fill: #888;
  }
  </style>
  