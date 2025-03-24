<template>
  <h4>Your stats:</h4>
  <table class="fs-stats-table">
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
        <td>
          {{
            ((userStats.wins / userStats.playedGames) * 100) % 1 === 0
              ? (userStats.wins / userStats.playedGames) * 100
              : ((userStats.wins / userStats.playedGames) * 100).toFixed(2)
          }}%
        </td>
      </tr>
      <tr>
        <th>Total guesses</th>
        <td>{{ userStats.guesses }}</td>
      </tr>
      <tr>
        <th>Avg. guesses/game</th>
        <td>{{ (userStats.guesses / userStats.playedGames).toFixed(1) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '@/stores/sessionStore'
import { useFullstackleStore } from '@/stores/fullstackleStore'
import type { User } from 'firebase/auth'
import type { DocumentData } from 'firebase/firestore'

const sessionStore = useSessionStore()
const fullstackleStore = useFullstackleStore()
const userStats = ref<UserStats>({ wins: 0, guesses: 0, playedGames: 0 })

type UserStats = {
  wins: number
  guesses: number
  playedGames: number
}

fullstackleStore.getStats(sessionStore.user as User).then((data: DocumentData) => {
  userStats.value = data.gameStats.fullstackleStats
})
</script>

<style scoped lang="scss">
h4 {
  margin: 0 0 5px 0;
}
.fs-stats-table {
  text-align: left;
  margin: 0 0 1rem 0;

  th,
  td {
    padding: 3px;
  }
}
</style>
