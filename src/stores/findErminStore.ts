import { defineStore } from 'pinia'
import { useSessionStore } from './sessionStore'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const useFindErminStore = defineStore('findermin', () => {
  const sessionStore = useSessionStore()

  const updatePlayerStats = async (time: number, won: boolean) => {
    if (sessionStore.user) {
      const userDoc = doc(db, 'users', sessionStore.user.uid)
      const userSnap = await getDoc(userDoc)
      if (userSnap.exists()) {
        const userData = userSnap.data()
        const previousAvgTime = userData.gameStats.findErminStats?.avgTime || 0
        const playedGames = userData.gameStats.findErminStats?.playedGames || 0
        const newAvgTime = (previousAvgTime * playedGames + time) / (playedGames + 1)

        await setDoc(userDoc, {
          uid: sessionStore.user.uid,
          email: sessionStore.user.email,
          displayName: sessionStore.user.displayName,
          photoURL: sessionStore.user.photoURL,
          gameStats: {
            fullstackleStats: {
              wins: userData.gameStats.fullstackleStats?.wins,
              guesses: userData.gameStats.fullstackleStats?.guesses,
              playedGames: userData.gameStats.fullstackleStats?.playedGames,
            },
            findErminStats: {
              wins: userData.gameStats.findErminStats?.wins + (won ? 1 : 0),
              avgTime: newAvgTime,
              playedGames: playedGames + 1,
            },
          },
        })
      }
    }
  }

  return { updatePlayerStats }
})
