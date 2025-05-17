<template>
    <div class="print-wrapper">
      <h1 class="text-3xl font-bold text-center my-6">Playoff Bracket (SVG Format)</h1>
  
      <BracketSvg class="mb-10" />
      <Leaderboard class="mt-10" />
  
      <p class="text-right text-xs text-gray-500 mt-4" v-if="lastUpdated">
        Updated {{ formatDate(lastUpdated) }}
      </p>
    </div>
  </template>
  
  <script setup>
  import BracketSvg from '@/components/BracketSvg.vue'
  import Leaderboard from '@/components/Leaderboard.vue'
  import { useLeaderboardStore } from '@/store/leaderboardStore'
  import { computed } from 'vue'
  
  const leaderboard = useLeaderboardStore()
  
  const lastUpdated = computed(() => leaderboard.lastUpdated)
  
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
  </script>
  
  <style scoped>
  .print-wrapper {
    margin: 0 auto;
    padding: 2rem;
    max-width: 1000px;
    background: white;
  }
  
  @media print {
    html,
    body {
      margin: 0;
      padding: 0;
      background: white;
    }
  
    .print-wrapper {
      padding: 1in;
      max-width: none;
    }
  
    button,
    nav,
    header,
    footer,
    .no-print {
      display: none !important;
    }
  }
  </style>
  