<template>
  <div class="bg-white rounded shadow p-2 border w-32">
    <div v-for="(team, teamIndex) in [match?.teamA, match?.teamB]" :key="team?.id || teamIndex">
      <div v-if="team" class="flex items-center justify-between space-x-2 cursor-pointer py-1 px-1 transition-all"
        :class="[
          {
            'opacity-50 pointer-events-none': match?.winner,
            'bg-green-100 rounded': match?.winner?.id === team.id,
            'flash-bg': winEffects[team.id]
          }
        ]" @click="handleTeamClick(team, teamIndex, $event)">
        <div class="flex items-center space-x-2">
          <img :src="team.logo" alt="" class="w-8 h-8" />
          <span class="text-sm font-semibold font-mono">{{ team.id }}</span>
        </div>
        <span class="font-bold text-sm" :class="{ 'animate-[winPulse_0.3s_ease-in-out]': winEffects[team.id] }">
          {{ getWins(team.id) }}
        </span>
      </div>
      <div v-else class="text-gray-400 italic text-sm text-center py-1">
        Waiting for opponent
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useBracketStore } from '@/store/bracketStore';

const props = defineProps({
  match: Object,
  round: Number,
  conference: String,
  matchIndex: Number
});

const emit = defineEmits(['clickTeam']);
const store = useBracketStore();

const winEffects = ref({});

function triggerEffect(teamId) {
  winEffects.value[teamId] = true;
  nextTick(() => {
    setTimeout(() => {
      winEffects.value[teamId] = false;
    }, 300);
  });
}

function handleTeamClick(team, teamIndex, event) {
  emit('clickTeam', {
    team,
    event,
    conference: props.conference,
    round: props.round,
    matchIndex: props.matchIndex,
    teamIndex
  });
  triggerEffect(team.id);
}

function getWins(teamId) {
  return store.roundWins[teamId]?.[props.round] ?? 0;
}
</script>

<style scoped>
@keyframes winPulse {
  0% {
    transform: scale(1);
    background-color: transparent;
  }

  50% {
    transform: scale(1.2);
    background-color: #bbf7d0;
  }

  100% {
    transform: scale(1);
    background-color: transparent;
  }
}

.flash-bg {
  animation: flashHighlight 0.3s ease-in-out;
}

@keyframes flashHighlight {
  0% {
    background-color: #bbf7d0;
  }

  100% {
    background-color: transparent;
  }
}
</style>