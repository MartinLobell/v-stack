<template>
  <WinModal v-if="openModal" @close-modal="closeModal" :characterName="correctName" />
  <div className="fs-table-container">
    <table className="fs-table">
      <thead className="fs-tablehead">
        <tr className="fs-tablerow">
          <th key="name" className="fs-tabledata">Name</th>
          <th key="gender" className="fs-tabledata">Gender</th>
          <th key="yearofbirth" className="fs-tabledata">Year of birth</th>
          <th key="hometown" className="fs-tabledata">Hometown</th>
          <th key="haircolor" className="fs-tabledata">Hair color</th>
          <th key="height" className="fs-tabledata">Height</th>
          <th key="joinedfullstack" className="fs-tabledata">Joined fullstack</th>
        </tr>
      </thead>
      <tbody className="fs-tablebody}" v-if="characterStore.guessedCharacters">
        <template v-for="(character, index) in characterStore.guessedCharacters" :key="index">
          <GuessRow :character="character" :charOfTheDay="characterStore.charOfTheDay" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import GuessRow from './GuessRow.vue'
import WinModal from '@/components/modals/WinModal.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useFullstackleStore } from '@/stores/fullstackleStore'
import type { Character } from '@/types/Character'
const characterStore = useCharacterStore()
const fullstackleStore = useFullstackleStore()
const openModal = ref(false)
const correctName = ref<string>('')

const closeModal = () => {
  openModal.value = !openModal.value
}

watch(
  () => characterStore.guessedCharacters as Character[],
  (newCharArr: Character[]) => {
    console.log('charOfTheDay: ', characterStore.charOfTheDay)

    if (newCharArr.length > 0) {
      const latestGuess: Character = newCharArr[newCharArr.length - 1]
      fullstackleStore.checkIfWon(latestGuess.name === characterStore.charOfTheDay.name)
      correctName.value = latestGuess.name
      setTimeout(() => {
        openModal.value = latestGuess.name === characterStore.charOfTheDay.name
      }, 1000)
    }
  },
)
</script>

<style scoped lang="scss">
.fs-table-container {
  width: 100%;
  .fs-table {
    font-size: 14px;
    border-spacing: 0;
    margin: 2rem auto;
    width: 100%;
    text-align: left;
    table-layout: fixed;
    .fs-tablehead {
      background-color: #000;
      color: #ffd900;
      text-align: center;
      font-weight: 600;
    }
    .fs-tablebody {
      background-color: #ffd900;
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>
