<template>
    <line
      :x1="from.x"
      :y1="from.y"
      :x2="to.x"
      :y2="to.y"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-dasharray="dashed ? '4,2' : null"
    />
  </template>
  
  <script setup>
  const props = defineProps({
    from: { type: Object, required: true }, // { x, y }
    to: { type: Object, required: true },   // { x, y }
    stroke: { type: String, default: '#999' },
    strokeWidth: { type: Number, default: 1 },
    dashed: { type: Boolean, default: false }
  })
  </script>
  