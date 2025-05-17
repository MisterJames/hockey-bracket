<template>
    <g :transform="`translate(${x}, ${y})`">
      <rect
        :width="width"
        :height="height"
        rx="6"
        ry="6"
        fill="#ffffff"
        stroke="#333"
        stroke-width="1"
      />
  
      <TeamSvg
        :team="match.teamA"
        :winner="match.winner"
        :round="round"
        :x="4"
        :y="(height / 2 - lineHeight * 1.5) - 4"
      />
  
      <TeamSvg
        :team="match.teamB"
        :winner="match.winner"
        :round="round"
        :x="4"
        :y="height / 2 + lineHeight /2"
      />
    </g>
  </template>
  
  
  <script setup>
  import { useBracketStore } from '@/store/bracketStore'
  import TeamSvg from '@/svg/TeamSvg.vue'
  
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
  