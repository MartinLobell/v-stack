<template>
  <div class="fs-dropdown-container">
    <ul class="fs-dropdown">
      <template v-if="options.length > 0">
        <li
          v-for="option in options"
          :key="option.name"
          tabindex="0"
          class="fs-dropdown-item fs-dropdown-item-option"
          @click="onSelect(option.name)"
          @keydown.enter="onSelect(option.name)"
        >
          {{ option.name }}
        </li>
      </template>
      <template v-else>
        <li class="fs-dropdown-item" key="No options">No options</li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/Character'
defineProps<{
  options: Character[]
  onSelect: (option: string) => void
}>()
</script>

<style scoped lang="scss">
.fs-dropdown-container {
  position: relative;
  width: 100%;

  .fs-dropdown {
    display: flex;
    flex-direction: column;
    border: solid 1px #000;
    border-top: none;
    width: 100%;
    position: absolute;
    background-color: #fff;
    margin: 0;
    padding: 0;
    z-index: 1;
    box-sizing: border-box;
  }

  .fs-dropdown-item {
    padding: 0.5rem;
    font-size: 16px;
    font-weight: 400;
    list-style: none;
    text-align: start;
    &-option:hover {
      background-color: #000;
      color: #ffd900;
      cursor: pointer !important;
    }
  }
}
</style>
