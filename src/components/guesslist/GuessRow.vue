<template>
  <tr class="fs-tablerow">
    <td :class="['fs-tabledata', { correct_attribute: character.name === charOfTheDay.name }]">
      {{ character.name }}
    </td>
    <td :class="['fs-tabledata', { correct_attribute: character.gender === charOfTheDay.gender }]">
      {{ character.gender }}
    </td>
    <td
      :class="[
        'fs-tabledata',
        { correct_attribute: character.birthYear === charOfTheDay.birthYear },
      ]"
    >
      {{ character.birthYear }}
    </td>
    <td
      :class="['fs-tabledata', { correct_attribute: character.hometown === charOfTheDay.hometown }]"
    >
      {{ character.hometown }}
    </td>
    <td
      :class="[
        'fs-tabledata',
        { correct_attribute: character.hairColour === charOfTheDay.hairColour },
      ]"
    >
      {{ character.hairColour }}
    </td>
    <td :class="['fs-tabledata', { correct_attribute: character.height === charOfTheDay.height }]">
      {{ character.height }}
    </td>
    <td
      :class="[
        'fs-tabledata',
        { correct_attribute: character.joinedFullstack === charOfTheDay.joinedFullstack },
      ]"
    >
      {{ character.joinedFullstack }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { Character } from '@/types/Character'
defineProps<{
  character: Character
  charOfTheDay: Character
}>()
</script>

<style scoped lang="scss">
.fs-tablerow {
  display: table-row;
  width: 100%;
  .fs-tabledata {
    padding: 10px;
    display: table-cell;
    width: calc(100% / var(--column-count));
    overflow: hidden;
    &.correct_attribute {
      background-color: rgb(139, 170, 0);
    }
  }
}
</style>
