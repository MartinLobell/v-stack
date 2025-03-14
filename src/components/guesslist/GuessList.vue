<template>
  <TurnoutModal
    won
    v-if="openModal"
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

const closeModal = () => {
  openModal.value = !openModal.value
}

watch(
  () => characterStore.guessedCharacters as Character[],
  (newCharArr: Character[]) => {
    const latestGuess: Character = newCharArr[newCharArr.length - 1]
    if (newCharArr.length > 0) {
      fullstackleStore.checkTurnout(
        latestGuess.name === characterStore.charOfTheDay.name,
        newCharArr.length,
      )
      // Save the guessed characters to localStorage
      localStorage.setItem('guessedCharacters', JSON.stringify(newCharArr))

      // Open the modal if the guess is correct or the player has lost
      setTimeout(() => {
        openModal.value =
          latestGuess.name === characterStore.charOfTheDay.name || fullstackleStore.hasLost
      }, 1000)

      // Check if the date has changed since the last play
      const lastPlayDate = localStorage.getItem('lastPlayDate')
      const currentDate = new Date().toDateString()
      if (lastPlayDate !== currentDate) {
        // Reset the guessed characters if the date has changed
        characterStore.guessedCharacters = []
        localStorage.setItem('guessedCharacters', JSON.stringify([]))
      }
      // Update the last play date in localStorage
      localStorage.setItem('lastPlayDate', currentDate)
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
