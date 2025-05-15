<template>
  <div class="relative w-full flex items-center space-x-2">
    <img v-if="selectedTeam && search" :src="selectedTeam.logo" class="w-6 h-6" />
    <div class="relative w-full">
      <input
        type="text"
        class="w-full border rounded p-2 pr-8"
        :placeholder="placeholder"
        v-model="search"
        @input="onInput"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @blur="onBlur"
        @focus="onInput"
      />
      <button
        v-if="search"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black pointer-events-auto"
        @mousedown.prevent="clearSelection"
        tabindex="-1"
        aria-label="Clear selection"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 8.586L4.707 3.293a1 1 0 10-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" />
        </svg>
      </button>
      <ul
        v-if="showDropdown && filteredTeams.length"
        class="absolute z-10 w-full bg-white border border-gray-300 max-h-60 overflow-y-auto"
      >
        <li
          v-for="(team, index) in filteredTeams"
          :key="team.name"
          @mousedown.prevent="selectTeam(team)"
          :class="[
            'p-2 flex items-center cursor-pointer hover:bg-gray-200',
            { 'bg-blue-100': index === highlightedIndex }
          ]"
        >
          <img :src="team.logo" alt="" class="w-6 h-6 mr-2" />
          {{ team.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { NHL_TEAMS } from '@/data/nhlTeams';

const props = defineProps({
  modelValue: Object,
  placeholder: String,
  conference: String, // 'east' or 'west'
  takenTeams: Array // new prop: array of already selected team names or abbrs
});
const emit = defineEmits(['update:modelValue']);

const allTeams = props.conference === 'west' ? NHL_TEAMS.west : NHL_TEAMS.east;

const search = ref('');
const selectedTeam = ref(props.modelValue || null);
const showDropdown = ref(false);
const highlightedIndex = ref(-1);

const filteredTeams = computed(() =>
  allTeams.filter((team) => {
    const isMatch = team.name.toLowerCase().includes(search.value.toLowerCase());
    const isTaken = props.takenTeams?.some(t => t === team.name || t === team.id);
    const isSelected = selectedTeam.value?.name === team.name;
    return isMatch && (!isTaken || isSelected);
  })
);

watch(() => props.modelValue, (newVal) => {
  selectedTeam.value = newVal;
  search.value = newVal?.name || '';
});

watch(search, (newVal) => {
  if (!newVal) {
    selectedTeam.value = null;
    emit('update:modelValue', null);
  }
});

function onInput() {
  showDropdown.value = true;
  highlightedIndex.value = 0;
}

function selectTeam(team) {
  selectedTeam.value = team;
  search.value = team.name;
  showDropdown.value = false;
  emit('update:modelValue', team);
}

function clearSelection() {
  selectedTeam.value = null;
  search.value = '';
  emit('update:modelValue', null);
}

function onBlur() {
  setTimeout(() => {
    showDropdown.value = false;
    const match = filteredTeams.value[highlightedIndex.value] || filteredTeams.value[0];
    if (match && search.value.toLowerCase() === match.name.toLowerCase().slice(0, search.value.length)) {
      selectTeam(match);
    } else if (!search.value) {
      clearSelection();
    }
  }, 100);
}

function onArrowDown() {
  if (highlightedIndex.value < filteredTeams.value.length - 1) {
    highlightedIndex.value++;
  }
}

function onArrowUp() {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
  }
}

function onEnter() {
  const team = filteredTeams.value[highlightedIndex.value];
  if (team) {
    selectTeam(team);
  }
}
</script>

<style scoped>
/* Optional: tweak styling */
</style>