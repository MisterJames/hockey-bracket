<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg max-w-md text-center">
      <p class="mb-4 text-lg font-semibold">
        {{ computedMessage }}
      </p>
      <p v-if="team && opponent" class="text-sm text-gray-500 mb-6">
        They have won 4 games against {{ opponent.name }}.
      </p>
      <div class="flex justify-center gap-4">
        <button @click="$emit('cancel')" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancel</button>
        <button @click="$emit('confirm')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  message: {
    type: String,
    default: '',
  },
  team: Object,
  opponent: Object,
});

defineEmits(['confirm', 'cancel']);

const visible = computed(() => props.show !== false);

const computedMessage = computed(() => {
  if (props.message) return props.message;
  if (props.team && props.opponent) {
    return `Advance ${props.team.name} to the next round?`;
  }
  return 'Are you sure?';
});
</script>

<style scoped>
/* Optional: add transitions or animations here */
</style>
