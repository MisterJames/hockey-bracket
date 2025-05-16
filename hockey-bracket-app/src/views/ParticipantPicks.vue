<template>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Welcome, {{ participant?.name }}</h2>
      <p class="text-gray-600 mb-6">Make your picks for all 4 rounds:</p>
  
      <div class="grid grid-cols-2 gap-10">
        <!-- WEST and EAST -->
        <div v-for="side in ['west', 'east']" :key="side">
          <h3 class="text-lg font-semibold mb-4 capitalize">{{ side }}ern Conference</h3>
          <div class="flex space-x-6">
            <div
              v-for="(round, roundIndex) in picks[side]"
              :key="roundIndex"
              class="flex flex-col space-y-4"
            >
              <div class="text-sm text-gray-500 font-medium text-center">
                Round {{ roundIndex + 1 }}
              </div>
              <div
                v-for="(selected, matchIndex) in round"
                :key="matchIndex"
                class="space-y-2"
              >
                <div v-for="team in getMatchOptions(side, roundIndex, matchIndex)" :key="team.id">
                  <button
                    class="w-48 flex items-center justify-between px-3 py-2 border rounded hover:bg-blue-100"
                    :class="{
                      'bg-blue-600 text-white': selected?.id === team.id
                    }"
                    @click="selectPick(side, roundIndex, matchIndex, team)"
                  >
                    <div class="flex items-center space-x-2">
                      <img :src="team.logo" class="w-6 h-6" />
                      <span class="font-mono text-sm">{{ team.id }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- FINAL ROUND -->
      <div class="mt-10">
        <h3 class="text-lg font-semibold mb-2">Stanley Cup Final</h3>
        <div class="flex space-x-4">
          <button
            v-for="team in getFinalOptions()"
            :key="team.id"
            class="w-48 flex items-center justify-between px-3 py-2 border rounded hover:bg-blue-100"
            :class="{
              'bg-blue-600 text-white': picks.final[0]?.id === team.id
            }"
            @click="picks.final[0] = team"
          >
            <div class="flex items-center space-x-2">
              <img :src="team.logo" class="w-6 h-6" />
              <span class="font-mono text-sm">{{ team.id }}</span>
            </div>
          </button>
        </div>
      </div>
  
      <!-- Save Button -->
      <div class="mt-8">
        <button
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          :disabled="!isComplete"
          @click="savePicks"
        >
          💾 Save All Picks
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { useParticipantStore } from '@/store/participantStore';
  import { computed, reactive } from 'vue';
  import { useBracketStore } from '@/store/bracketStore';
  
  const bracketStore = useBracketStore();
  const route = useRoute();
    const router = useRouter();
  const store = useParticipantStore();
  const participantId = route.params.id;
  const participant = store.getParticipant(participantId);

  // if no participant found, redirect to home
  if (!participant) {
    router.push('/');
    }

  const round1 = {
    west: bracketStore.matchups.west?.[0] ?? [],
    east: bracketStore.matchups.east?.[0] ?? []
  };
  
  // use flat teamA/teamB arrays to seed round 1
  const picks = reactive({
    west: [
      round1.west.map(() => null),
      [null, null],
      [null]
    ],
    east: [
      round1.east.map(() => null),
      [null, null],
      [null]
    ],
    final: [null]
  });

  // set initial picks from participant
  function selectPick(side, round, matchIndex, team) {
    picks[side][round][matchIndex] = team;
  
    // clear downstream picks
    for (let r = round + 1; r < picks[side].length; r++) {
      const next = picks[side][r];
      const numMatches = next.length;
      for (let i = 0; i < numMatches; i++) {
        next[i] = null;
      }
    }
  
    // clear final if this affects it
    picks.final[0] = null;
  }
  
  // getMatchOptions for each round
  function getMatchOptions(side, round, matchIndex) {
    if (round === 0) {
      const match = round1[side][matchIndex];
      return [match.teamA, match.teamB];
    } else {
      const prevRound = picks[side][round - 1];
      const teamA = prevRound[matchIndex * 2];
      const teamB = prevRound[matchIndex * 2 + 1];
      return [teamA, teamB].filter(Boolean);
    }
  }
  
  // getFinalOptions for the final round from the conference finalists
  function getFinalOptions() {
    const westFinalist = picks.west[2][0];
    const eastFinalist = picks.east[2][0];
    return [westFinalist, eastFinalist].filter(Boolean);
  }
  
  // check if all picks are made
  const isComplete = computed(() =>
    Object.values(picks.west).flat().every(p => p?.id) &&
    Object.values(picks.east).flat().every(p => p?.id) &&
    picks.final[0]?.id
  );
  
  function savePicks() {
    participant.picks = JSON.parse(JSON.stringify(picks));
    router.push('/');
  }
  </script>
  