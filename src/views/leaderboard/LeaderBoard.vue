<template>
  <h1>Leaderboard</h1>
  <div class="fs-leaderboard-container">
    <table class="fs-leaderboard-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Played games</th>
          <th>Total guesses</th>
          <th>Wins</th>
          <th class="underline">Power score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userName">
          <th>{{ user.userName }}</th>
          <td>{{ user.stats.playedGames }}</td>
          <td>{{ user.stats.guesses }}</td>
          <td>{{ user.stats.wins }}</td>
          <td>
            {{
              (user.stats.wins / user.stats.guesses / user.stats.playedGames) % 1 === 0
                ? user.stats.wins / user.stats.guesses / user.stats.playedGames
                : (user.stats.wins / user.stats.guesses / user.stats.playedGames).toFixed(2)
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/sessionStore'
import { ref } from 'vue'
const sessionStore = useSessionStore()
interface LeaderboardUser {
  userName: string
  stats: {
    wins: number
    guesses: number
    playedGames: number
  }
}

const users = ref<LeaderboardUser[]>([])

sessionStore.getAllStats().then((data: LeaderboardUser[]) => {
  users.value = (data || []).sort((a, b) => {
    const aWinsPerGuesses = a.stats.wins / a.stats.guesses / a.stats.playedGames
    const bWinsPerGuesses = b.stats.wins / b.stats.guesses / b.stats.playedGames
    return bWinsPerGuesses - aWinsPerGuesses
  })
})
</script>

<style scoped lang="scss">
.fs-leaderboard-container {
  width: 100%;

  .fs-leaderboard-table {
    font-size: 14px;
    border-spacing: 0;
    margin: 2rem auto;
    width: 100%;
    text-align: left;
    table-layout: fixed;
    thead {
      background-color: #000;
      color: #ffd900;
      font-weight: 600;
      td,
      th {
        padding: 10px;
      }
      .underline {
        text-decoration: underline;
      }
    }
    tbody {
      font-weight: 400;
      font-size: 14px;
      tr {
        display: table-row;
        width: 100%;
      }
    }
    td {
      padding: 10px;
      display: table-cell;
      width: calc(100% / var(--column-count));
      overflow: hidden;
    }
  }
}
</style>
