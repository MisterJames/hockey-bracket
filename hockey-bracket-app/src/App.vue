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
// no logic needed here now
</script>

<style scoped>
/* Global app styling remains here if needed */
</style>
