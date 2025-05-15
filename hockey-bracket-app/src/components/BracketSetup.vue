<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Bracket Setup</h2>

    <div class="grid grid-cols-2 gap-8">
      <div>
        <h3 class="font-semibold mb-2">Western Conference</h3>
        <div v-for="(matchup, index) in westernMatchups" :key="index" class="mb-4">
          <TeamSelect
            v-model="matchup.teamA"
            placeholder="Team A"
            conference="west"
            :taken-teams="selectedTeamNamesExcept(matchup.teamA)"
          />
          <TeamSelect
            v-model="matchup.teamB"
            placeholder="Team B"
            conference="west"
            :taken-teams="selectedTeamNamesExcept(matchup.teamB)"
          />
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-2">Eastern Conference</h3>
        <div v-for="(matchup, index) in easternMatchups" :key="index" class="mb-4">
          <TeamSelect
            v-model="matchup.teamA"
            placeholder="Team A"
            conference="east"
            :taken-teams="selectedTeamNamesExcept(matchup.teamA)"
          />
          <TeamSelect
            v-model="matchup.teamB"
            placeholder="Team B"
            conference="east"
            :taken-teams="selectedTeamNamesExcept(matchup.teamB)"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 space-x-4">
      <button
  :class="[
    'font-semibold py-2 px-4 rounded',
    isFormComplete ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  ]"
  :disabled="!isFormComplete"
  @click="submitBracket"
>
  Save Bracket
</button>


      <button
        class="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
        @click="clearBracket"
      >
        Clear Bracket
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBracketStore } from '@/store/bracketStore';
import TeamSelect from '@/components/TeamSelect.vue';

const store = useBracketStore();
const router = useRouter();

const easternMatchups = ref([
  { teamA: null, teamB: null },
  { teamA: null, teamB: null },
  { teamA: null, teamB: null },
  { teamA: null, teamB: null },
]);

const westernMatchups = ref([
  { teamA: null, teamB: null },
  { teamA: null, teamB: null },
  { teamA: null, teamB: null },
  { teamA: null, teamB: null },
]);

function selectedTeamNamesExcept(currentTeam) {
  return [...easternMatchups.value, ...westernMatchups.value]
    .flatMap(m => [m.teamA, m.teamB])
    .filter(t => t && t !== currentTeam)
    .map(t => t.name);
}

const isFormComplete = computed(() => {
  const all = [...easternMatchups.value, ...westernMatchups.value];
  return all.every(m => m.teamA !== null && m.teamB !== null);
});

function submitBracket() {
  if (!isFormComplete.value) return;
  const eastTeams = easternMatchups.value.flatMap((m) => [m.teamA, m.teamB]);
  const westTeams = westernMatchups.value.flatMap((m) => [m.teamA, m.teamB]);
  store.configureBracket(eastTeams, westTeams);
  router.push('/');
}

function clearBracket() {
  easternMatchups.value = [
    { teamA: null, teamB: null },
    { teamA: null, teamB: null },
    { teamA: null, teamB: null },
    { teamA: null, teamB: null },
  ];
  westernMatchups.value = [
    { teamA: null, teamB: null },
    { teamA: null, teamB: null },
    { teamA: null, teamB: null },
    { teamA: null, teamB: null },
  ];
  store.resetBracket();
}
</script>

<style scoped>
/* Optional styling tweaks */
</style>
