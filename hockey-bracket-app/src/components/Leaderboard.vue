<template>
    <div class="p-4 bg-white shadow-md rounded-xl">
      <h2 class="text-xl font-bold mb-4">🏆 Leaderboard</h2>
      <table class="w-full text-sm text-left border-collapse">
        <thead>
          <tr class="border-b">
            <th class="py-2">#</th>
            <th class="py-2">Name</th>
            <th class="py-2">R1</th>
            <th class="py-2">R2</th>
            <th class="py-2">R3</th>
            <th class="py-2">R4</th>
            <th class="py-2 font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(player, index) in leaderboard.leaders"
            :key="player.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-1 px-2">{{ index + 1 }}</td>
            <td class="py-1 px-2">{{ player.name }}</td>
            <td class="py-1 px-2 text-center">{{ player.round1 }}</td>
            <td class="py-1 px-2 text-center">{{ player.round2 }}</td>
            <td class="py-1 px-2 text-center">{{ player.round3 }}</td>
            <td class="py-1 px-2 text-center">{{ player.round4 }}</td>
            <td class="py-1 px-2 text-center font-bold">{{ player.total }}</td>
          </tr>
          <tr v-if="leaderboard.leaders.length === 0">
            <td colspan="7" class="text-center py-4 text-gray-500">
              No participants yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { useLeaderboardStore } from '@/store/leaderboardStore'
  const leaderboard = useLeaderboardStore()
  </script>
  