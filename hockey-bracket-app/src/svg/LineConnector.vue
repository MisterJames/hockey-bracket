<template>
  <g>
    <!-- Connector line (elbow shape) -->
    <path :d="pathData" fill="none" stroke="#888" stroke-width="1" stroke-linejoin="round" />


  </g>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  from: Object, // { x, y }
  to: Object     // { x, y }
})

// Create elbow-style path: ┐ or ┘
const pathData = computed(() => {
  const r = 6
  const start = props.from
  const end = props.to
  const midX = (start.x + end.x) / 2

  // Determine vertical direction
  const yDirection = end.y > start.y ? 1 : -1

  return `
    M ${start.x} ${start.y}
    L ${midX - r} ${start.y}
    Q ${midX} ${start.y} ${midX} ${start.y + r * yDirection}
    L ${midX} ${end.y - r * yDirection}
    Q ${midX} ${end.y} ${midX + r} ${end.y}
    L ${end.x} ${end.y}
  `
})


</script>