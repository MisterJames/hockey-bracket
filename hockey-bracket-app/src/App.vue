<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 font-sans">
    <!-- Header -->
    <header class="bg-blue-900 text-white px-6 py-4 shadow-md">
      <h1 class="text-2xl font-bold">🏒 Hockey Bracket Tracker</h1>
    </header>

    <!-- Main view -->
    <main class="px-6 pb-12">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useParticipantStore } from '@/store/participantStore'
import { useBracketStore } from '@/store/bracketStore'
import { useLeaderboardStore } from '@/store/leaderboardStore'

const participants = useParticipantStore()
const bracket = useBracketStore()
const leaderboard = useLeaderboardStore()

// Save participant state to localStorage on change
watch(
  () => participants.participants,
  (newVal) => {
    localStorage.setItem('participantState', JSON.stringify(newVal))
  },
  { deep: true }
)

// Recompute leaderboard on participant or bracket changes
watch(
  () => [participants.participants, bracket.roundWins],
  () => leaderboard.recompute(participants.participants, bracket.roundWins),
  { deep: true, immediate: true }
)
</script>


<style scoped>
/* Global app styling remains here if needed */
</style>
