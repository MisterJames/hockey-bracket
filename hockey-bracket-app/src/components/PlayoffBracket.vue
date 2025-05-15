<template>
  <div class="flex">
    <div class="w-2/3 p-4">
      <h2 class="text-xl font-bold mb-4">Stanley Cup Playoffs</h2>

      <div v-for="conference in ['west', 'east']" :key="conference" class="mb-10">
  <h3 class="text-lg font-semibold mb-2">
    {{ conference === 'west' ? 'Western Conference' : 'Eastern Conference' }}
  </h3>

  <div class="flex space-x-6">
    <div v-for="(round, roundIndex) in bracket[conference]" :key="roundIndex" class="mb-6">
      <div class="relative group mb-1">
        <div class="font-medium text-sm text-gray-500">
          Round {{ roundIndex + 1 }}
        </div>
        <button
          class="absolute right-0 top-0 text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 opacity-0 group-hover:opacity-100 transition"
          @click="confirmClearRound(conference, roundIndex)"
        >
          Clear Round
        </button>
      </div>


      <Matchup
        v-for="(match, matchIndex) in round"
        :key="matchIndex"
        :match="match"
        :round="roundIndex"
        :conference="conference"
        :matchIndex="matchIndex"
        @clickTeam="handleClick"
      />
    </div>
  </div>
</div>

<ConfirmModal
  v-if="modalTeam"
  :team="Object.keys(modalTeam).length ? modalTeam : null"
  :opponent="Object.keys(modalOpponent).length ? modalOpponent : null"
  :message="roundToClear ? `Are you sure you want to clear Round ${roundToClear.round + 1} – ${roundToClear.conference.toUpperCase()}?` : ''"
  @confirm="roundToClear ? confirmRoundClear() : confirmWinner()"
  @cancel="cancelModal"
/>




    </div>


  </div>
</template>


<script setup>
import { computed, ref } from 'vue';
import { useBracketStore } from '@/store/bracketStore';
import ConfirmModal from '@/components/ConfirmModal.vue';
import Matchup from '@/components/Matchup.vue';

const store = useBracketStore();
const modalTeam = ref(null);
const modalOpponent = ref(null);
const pendingAdvance = ref(null);
const roundToClear = ref(null);
const bracket = computed(() => store.matchups);

function confirmClearRound(conference, round) {
  roundToClear.value = { conference, round };
  modalTeam.value = {}; // just trigger the modal; will show generic message
  modalOpponent.value = {}; // optional fallback
}

function confirmRoundClear() {
  const { conference, round } = roundToClear.value;
  const rounds = bracket.value[conference];

  // 1. Reset all wins in this round
  rounds[round].forEach(match => {
    [match.teamA, match.teamB].forEach(team => {
      if (team?.id) store.updateWinCount(team.id, round, 0);
    });
    match.winner = null;
  });

  // 2. Clear downstream rounds
  for (let r = round + 1; r < rounds.length; r++) {
  rounds[r] = rounds[r].filter(match =>
    match.teamA !== null || match.teamB !== null
  );

  if (rounds[r].length === 0) {
    // optionally remove the round if it's now empty
    rounds.splice(r, 1);
    r--; // re-check this index since we removed an item
  } else {
    rounds[r].forEach(match => {
      match.teamA = null;
      match.teamB = null;
      match.winner = null;
    });
  }
}


  // 3. Done
  cancelModal();
}

function cancelModal() {
  modalTeam.value = null;
  modalOpponent.value = null;
  roundToClear.value = null;
}
function getWins(teamId, round) {
  return store.roundWins[teamId]?.[round] ?? 0;
}

function setWins(teamId, round, count) {
  const clamped = Math.max(0, Math.min(4, count));
  store.updateWinCount(teamId, round, clamped);
}

function handleClick({ team, event, conference, round, matchIndex, teamIndex }) {
  const decrement = event.shiftKey;
  onClickTeam(team, conference, round, matchIndex, teamIndex, decrement);
}


function onClickTeam(team, conf, round, matchIndex, teamIndex, decrement) {
  if (!team || isMatchLocked(conf, round, matchIndex)) return;

  const current = getWins(team.id, round);
  const newCount = decrement ? current - 1 : current + 1;
  const clamped = Math.max(0, Math.min(4, newCount));

  if (clamped === 4 && current < 4 && !decrement) {
    const match = bracket.value[conf][round][matchIndex];
    const opponent = teamIndex === 0 ? match.teamB : match.teamA;
    modalTeam.value = { ...team };
    modalOpponent.value = { ...opponent };
    pendingAdvance.value = { conf, round, matchIndex, teamIndex };
    return;
  }

  setWins(team.id, round, clamped);
}

function confirmWinner() {
  const { conf, round, matchIndex, teamIndex } = pendingAdvance.value;
  const match = bracket.value[conf][round][matchIndex];
  const winner = teamIndex === 0 ? match.teamA : match.teamB;

  match.winner = winner;

  const nextRound = bracket.value[conf][round + 1] ||= [];
  const nextMatchIndex = Math.floor(matchIndex / 2);
  const nextMatch = nextRound[nextMatchIndex] ||= { teamA: null, teamB: null };
  if (matchIndex % 2 === 0) {
    nextMatch.teamA = winner;
  } else {
    nextMatch.teamB = winner;
  }

  setWins(winner.id, round, 4);

  modalTeam.value = null;
  modalOpponent.value = null;
  pendingAdvance.value = null;
}

function isMatchLocked(conf, round, matchIndex) {
  const match = bracket.value[conf][round][matchIndex];
  return !!match?.winner;
}
</script>

<style scoped>
/* Add responsive styling or Tailwind utility classes as needed */
</style>
