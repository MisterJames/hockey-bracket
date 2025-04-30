<template>
  <div class="grid grid-cols-2 gap-8">
    <div>
      <h2 class="text-xl font-bold mb-4">Western Conference</h2>
      <div v-for="(matchup, i) in westernMatchups" :key="i" class="mb-4 grid grid-cols-2 gap-4">
        <TeamSelect
          v-model="westernMatchups[i].teamA"
          :options="availableWestTeams"
          :id="`west-teamA-${i}`"
          label="Team A"
        />
        <TeamSelect
          v-model="westernMatchups[i].teamB"
          :options="availableWestTeams"
          :id="`west-teamB-${i}`"
          label="Team B"
        />
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold mb-4">Eastern Conference</h2>
      <div v-for="(matchup, i) in easternMatchups" :key="i" class="mb-4 grid grid-cols-2 gap-4">
        <TeamSelect
          v-model="easternMatchups[i].teamA"
          :options="availableEastTeams"
          :id="`east-teamA-${i}`"
          label="Team A"
        />
        <TeamSelect
          v-model="easternMatchups[i].teamB"
          :options="availableEastTeams"
          :id="`east-teamB-${i}`"
          label="Team B"
        />
      </div>
    </div>

    <div class="col-span-2 mt-8">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        :disabled="!canSave"
        @click="saveBracket"
      >
        Save Bracket
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useBracketStore } from '@/store/bracketStore';
import { NHL_TEAMS } from '@/data/nhlTeams';
import TeamSelect from './TeamSelect.vue';

export default {
  components: { TeamSelect },
  setup() {
    const bracketStore = useBracketStore();
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

    const availableWestTeams = computed(() => NHL_TEAMS.west);
    const availableEastTeams = computed(() => NHL_TEAMS.east);

    const canSave = computed(() => {
      return (
        easternMatchups.value.every(m => m.teamA && m.teamB) &&
        westernMatchups.value.every(m => m.teamA && m.teamB)
      );
    });

    function saveBracket() {
      const east = easternMatchups.value.map(m => ({ teamA: m.teamA, teamB: m.teamB }));
      const west = westernMatchups.value.map(m => ({ teamA: m.teamA, teamB: m.teamB }));
      bracketStore.configureBracket(east, west);
    }

    return {
      easternMatchups,
      westernMatchups,
      availableWestTeams,
      availableEastTeams,
      canSave,
      saveBracket,
    };
  },
};
</script>