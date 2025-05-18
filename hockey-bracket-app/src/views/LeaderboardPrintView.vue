<template>
  <div class="print-wrapper">
    <h1 class="text-3xl font-bold text-center my-6">Playoff Bracket Tracker</h1>

    <BracketSvg class="mb-5" />
    <Leaderboard class="mt-5" :showFinalPick="true" />

  </div>
</template>

<script setup>
import BracketSvg from '@/svg/BracketSvg.vue'
import Leaderboard from '@/components/Leaderboard.vue'
import { useLeaderboardStore } from '@/store/leaderboardStore'
import { computed, watchEffect, onMounted } from 'vue'
import { useLeaderboardSync } from '@/composables/useLeaderboardSync'

useLeaderboardSync() // <-- Ensure leaderboard stays in sync

const leaderboard = useLeaderboardStore()

onMounted(() => {
  console.log('[LeaderboardPrintView] Mounted')
  console.log('[LeaderboardPrintView] leaderboard.leaders:', leaderboard.leaders)
  console.log('[LeaderboardPrintView] leaderboard.lastUpdated:', leaderboard.lastUpdated)
})

watchEffect(() => {
  console.log('[LeaderboardPrintView] leaders changed:', leaderboard.leaders)
  console.log('[LeaderboardPrintView] lastUpdated:', leaderboard.lastUpdated)
})

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
