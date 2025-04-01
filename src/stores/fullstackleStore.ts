import { defineStore } from 'pinia'
import { useSessionStore } from './sessionStore'
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { User } from 'firebase/auth'

export const useFullstackleStore = defineStore('fullstackle', () => {
  const sessionStore = useSessionStore()

  const updateGame = async (won: boolean, newGuesses: number) => {
    updatePlayerStats(newGuesses, won)
    localStorage.setItem('hasPlayed', 'true')
  }

  const updatePlayerStats = async (newGuesses: number, won: boolean) => {
    if (sessionStore.user) {
      const userDoc = doc(db, 'users', sessionStore.user.uid)
      const userSnap = await getDoc(userDoc)
      if (userSnap.exists()) {
        const userData = userSnap.data()
        await setDoc(userDoc, {
          uid: sessionStore.user.uid,
          email: sessionStore.user.email,
          displayName: sessionStore.user.displayName,
          photoURL: sessionStore.user.photoURL,
          gameStats: {
            fullstackleStats: {
              wins: userData.gameStats.fullstackleStats.wins + (won ? 1 : 0),
              guesses: (userData.gameStats.fullstackleStats.guesses || 0) + newGuesses,
              playedGames: (userData.gameStats.fullstackleStats.playedGames || 0) + 1,
            },
            findErminStats: {
              wins: userData.gameStats.findErminStats.wins,
              avgTime: userData.gameStats.findErminStats.avgTime,
              playedGames: userData.gameStats.findErminStats.playedGames,
            },
          },
        })
      }
    }
  }

  // If a single user is passed, return their stats. If no user is passed, return all users' stats.
  const getStats = async (user?: User) => {
    if (user) {
      const userDoc = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userDoc)
      if (userSnap.exists()) {
        const userData = userSnap.data()
        return userData
      }
    }
    const usersCollection = collection(db, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    const usersList = usersSnapshot.docs.map((doc) => doc.data())
    return usersList
  }

  return { updateGame, getStats }
})
