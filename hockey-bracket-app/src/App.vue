<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isPrintView = computed(() => route.path === '/print')

import { useLeaderboardSync } from '@/composables/useLeaderboardSync'
useLeaderboardSync()
</script>

<template>
  <div :class="[
    'text-gray-900 font-sans',
    isPrintView ? '' : 'min-h-screen bg-gray-100'
  ]">
    <!-- Header (hidden in print view) -->
    <header v-if="!isPrintView" class="bg-blue-900 text-white px-6 py-4 shadow-md">
      <h1 class="text-2xl font-bold">🏒 Playoff Bracket Tracker</h1>
    </header>

    <!-- Main view -->
    <main :class="[isPrintView ? 'p-0 m-0' : 'px-6 pb-12']">
      <router-view />
    </main>
  </div>
</template>


<style>
@media print {

  body,
  html {
    margin: 0;
    padding: 0;
    background: white;
  }

  #app {
    padding: 0 !important;
    margin: 0 !important;
    background: white !important;
  }

  header,
  nav,
  footer {
    display: none !important;
  }

  .bracket-column {
    break-inside: avoid;
  }
}
</style>
