<template>
    <div class="print-wrapper">
      <h1 class="text-3xl font-bold text-center my-6">Playoff Bracket Tracker</h1>
  
      <div class="bracket-grid">
        <!-- West Rounds 1–3 -->
        <BracketColumn :round="0" region="west" />
        <BracketColumn :round="1" region="west" />
        <BracketColumn :round="2" region="west" />
  
        <!-- Final -->
        <BracketColumn :round="3" region="final" />
  
        <!-- East Rounds 3–1 (reversed) -->
        <BracketColumn :round="2" region="east" :reverse="true" />
        <BracketColumn :round="1" region="east" :reverse="true" />
        <BracketColumn :round="0" region="east" :reverse="true" />
      </div>
  
      <Leaderboard/>
  
      <p class="text-right text-xs text-gray-500 mt-4" v-if="lastUpdated">
        Updated {{ formatDate(lastUpdated) }}
      </p>
    </div>
  </template>
  
  <script setup>
  import BracketColumn from '@/components/BracketColumn.vue'
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
  .bracket-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.5rem;
  }
  
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
  
    .bracket-column {
      break-inside: avoid;
    }
  }
  </style>
  