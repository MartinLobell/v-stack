<template>
  <TurnoutModal
    v-if="openModal"
    :hasWon="hasWon"
    @close-modal="closeModal"
    :characterName="characterStore.charOfTheDay.name"
  />
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
        </tr>
      </thead>
      <tbody class="fs-tablebody" v-if="characterStore.guessedCharacters">
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
import TurnoutModal from '@/components/modals/TurnoutModal.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useFullstackleStore } from '@/stores/fullstackleStore'
import type { Character } from '@/types/Character'
const characterStore = useCharacterStore()
const fullstackleStore = useFullstackleStore()
const openModal = ref(false)
const hasWon = ref(false)

const closeModal = () => {
  openModal.value = false
}

watch(
  () => characterStore.guessedCharacters as Character[],
  (newCharArr: Character[]) => {
    const latestGuess: Character = newCharArr[newCharArr.length - 1]

    // If a character has been added and the user hasn't played today already, check outcome
    if (newCharArr.length > 0 && localStorage.getItem('hasPlayedFullstackle') !== 'true') {
      if (newCharArr.length >= 4 || latestGuess.name === characterStore.charOfTheDay.name) {
        if (latestGuess.name === characterStore.charOfTheDay.name) hasWon.value = true
        fullstackleStore.updateGame(hasWon.value, newCharArr.length)

        // If the user has won or run out of chances, open the modal
        setTimeout(() => {
          openModal.value =
            latestGuess.name === characterStore.charOfTheDay.name || newCharArr.length >= 4
        }, 1000)
      }
      // Save the guessed characters to localStorage
      localStorage.setItem('guessedCharacters', JSON.stringify(newCharArr))
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
      .fs-tablerow {
        .fs-tabledata {
          padding: 10px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .fs-tablebody {
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>
