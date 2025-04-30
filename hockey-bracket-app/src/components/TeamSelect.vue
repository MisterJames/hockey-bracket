<template>
    <div class="w-full">
      <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
      </label>
      <div class="relative">
        <input
          :id="id"
          type="text"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          v-model="inputValue"
          @input="onInput"
          @focus="showDropdown = true"
          @blur="hideDropdown"
          :placeholder="placeholder"
          autocomplete="off"
          :aria-expanded="showDropdown.toString()"
        />
        <ul
          v-if="showDropdown && filteredOptions.length"
          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto sm:text-sm"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.abbr"
            class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
            @mousedown.prevent="selectOption(option)"
          >
            <div class="flex items-center">
              <img :src="option.logo" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
              <span class="ml-3 block truncate">
                {{ option.name }} ({{ option.abbr }})
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: { type: Object, default: null },
      options: { type: Array, required: true },
      id: { type: String, default: 'team-select' },
      label: { type: String, default: 'Team' },
      placeholder: { type: String, default: 'Type team name...' }
    },
    data() {
      return {
        inputValue: this.modelValue?.name || '',
        showDropdown: false
      };
    },
    computed: {
      filteredOptions() {
        const search = this.inputValue.toLowerCase();
        return this.options.filter(option =>
          option.name.toLowerCase().includes(search) ||
          option.abbr.toLowerCase().includes(search)
        );
      }
    },
    watch: {
      modelValue(newVal) {
        this.inputValue = newVal?.name || '';
      }
    },
    methods: {
      selectOption(option) {
        this.$emit('update:modelValue', option);
        this.inputValue = option.name;
        this.showDropdown = false;
      },
      onInput() {
        this.showDropdown = true;
      },
      hideDropdown() {
        setTimeout(() => this.showDropdown = false, 100);
      }
    }
  };
  </script>