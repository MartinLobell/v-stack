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
        <td>{{ (userStats.wins / userStats.playedGames) * 100 }}%</td>
      </tr>
      <tr>
        <th>Total guesses</th>
        <td>{{ userStats.guesses }}</td>
      </tr>
      <tr>
        <th>Avg. guesses/game</th>
        <td>{{ (userStats.guesses / userStats.wins).toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/sessionStore'
import { computed } from 'vue'

const sessionStore = useSessionStore()

const userStats = computed(() => sessionStore.user?.fullstackleStats || {})
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
