<template>
  <h1>Fullstackle Leaderboard</h1>
  <div class="fs-leaderboard-container">
    <table class="fs-leaderboard-table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Played games</th>
          <th>Total guesses</th>
          <th>Wins</th>
          <th class="underline">Power score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.displayName">
          <th class="fs-profile-th">
            <img
              :src="user.photoURL || '/src/assets/icons/profile-logo.png'"
              width="45"
              :alt="user.displayName + 's profile image'"
            />{{ user.displayName }}
          </th>
          <td>{{ user.gameStats.fullstackleStats.playedGames }}</td>
          <td>{{ user.gameStats.fullstackleStats.guesses }}</td>
          <td>{{ user.gameStats.fullstackleStats.wins }}</td>
          <td class="underline">
            {{
              (user.gameStats.fullstackleStats.wins /
                user.gameStats.fullstackleStats.guesses /
                user.gameStats.fullstackleStats.playedGames) %
                1 ===
              0
                ? user.gameStats.fullstackleStats.wins /
                  user.gameStats.fullstackleStats.guesses /
                  user.gameStats.fullstackleStats.playedGames
                : (
                    user.gameStats.fullstackleStats.wins /
                    user.gameStats.fullstackleStats.guesses /
                    user.gameStats.fullstackleStats.playedGames
                  ).toFixed(2)
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useFullstackleStore } from '@/stores/fullstackleStore'
import { ref } from 'vue'
import type { DocumentData } from 'firebase/firestore'
const fullstackleStore = useFullstackleStore()
interface LeaderboardUser {
  displayName: string
  photoURL: string
  gameStats: {
    fullstackleStats: {
      wins: number
      guesses: number
      playedGames: number
    }
    findErminStats: {
      wins: number
      avgTime: number
      playedGames: number
    }
  }
}

type userRes = {
  displayName: string
  email: string
  photoURL: string
  uid: string
  gameStats: {
    fullstackleStats: {
      wins: number
      guesses: number
      playedGames: number
    }
    findErminStats: {
      wins: number
      avgTime: number
      playedGames: number
    }
  }
}

const users = ref<LeaderboardUser[]>([])

fullstackleStore.getStats().then((data: DocumentData) => {
  const leaderboardUsers: LeaderboardUser[] = data.map((user: userRes) => ({
    displayName: user.displayName,
    photoURL: user.photoURL,
    gameStats: {
      fullstackleStats: {
        wins: user.gameStats.fullstackleStats.wins,
        guesses: user.gameStats.fullstackleStats.guesses,
        playedGames: user.gameStats.fullstackleStats.playedGames,
      },
    },
  }))
  users.value = (leaderboardUsers || []).sort((a, b) => {
    const aWinsPerGuesses =
      a.gameStats.fullstackleStats.wins /
      a.gameStats.fullstackleStats.guesses /
      a.gameStats.fullstackleStats.playedGames
    const bWinsPerGuesses =
      b.gameStats.fullstackleStats.wins /
      b.gameStats.fullstackleStats.guesses /
      b.gameStats.fullstackleStats.playedGames
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
    // margin: 2rem auto;
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
    }
    tbody {
      font-weight: 400;
      font-size: 14px;
      tr {
        display: table-row;
        width: 100%;
        th.fs-profile-th {
          display: flex;
          align-items: center;
          padding: 10px;
          img {
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }
    td {
      padding: 10px;
      display: table-cell;
      width: calc(100% / var(--column-count));
      overflow: hidden;
    }
    .underline {
      text-decoration: underline;
    }
  }
}
</style>
