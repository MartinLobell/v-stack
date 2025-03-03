<template>
  <div className="fs-modal-backdrop" @click="emitCloseModal()">
    <div className="fs-modal">
      <div>
        <h2 className="fs-modal-title">
          {{ fullstackleStore.hasWon ? 'You won!' : 'You lost...' }}
        </h2>
        <p className="fs-modal-text">
          You have {{ !fullstackleStore.hasWon ? 'not successfully ' : '' }}guessed the character of
          the day!
        </p>
        <h3>It was {{ characterName }}!</h3>
        <table>
          <tbody>
            <tr>
              <th>Played rounds</th>
              <td>{{ userStats.playedGames }}</td>
            </tr>
            <tr>
              <th>Wins</th>
              <td>{{ userStats.wins }}</td>
            </tr>
            <tr>
              <th>Win rate</th>
              <td>{{ (userStats.playedGames / userStats.wins).toFixed(2) }}%</td>
            </tr>
            <tr>
              <th>Guesses</th>
              <td>{{ userStats.guesses }}</td>
            </tr>
            <tr>
              <th>Guess rate</th>
              <td>{{ (userStats.wins / userStats.guesses).toFixed(2) }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="fs-modal-button" @click="emitCloseModal()">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullstackleStore } from '@/stores/fullstackleStore'
import { useSessionStore } from '@/stores/sessionStore'
import { ref } from 'vue'
defineProps<{
  characterName: string
}>()
const fullstackleStore = useFullstackleStore()
const sessionStore = useSessionStore()
const emit = defineEmits(['close-modal'])
const userStats = ref(sessionStore.user.fullstackleStats)

const emitCloseModal = () => {
  emit('close-modal')
}
</script>

<style scoped lang="scss">
.fs-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .fs-modal {
    background-color: #fff;
    border-radius: 8px;
    width: 300px;
    height: 300px;
    padding: 40px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .fs-modal-button {
    background-color: #ffd900;
    color: #000;
    padding: 10px 20px;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      transition: 0.3s;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
