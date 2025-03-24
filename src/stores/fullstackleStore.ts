import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSessionStore } from './sessionStore'
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { User } from 'firebase/auth'

export const useFullstackleStore = defineStore('fullstackle', () => {
  const hasWon = ref(false)
  const hasLost = ref(false)
  const sessionStore = useSessionStore()

  const checkTurnout = async (won: boolean, newGuesses: number) => {
    if (newGuesses >= 4) {
      updatePlayerStats(newGuesses, won)
      hasLost.value = true
    }
    if (won === true) {
      updatePlayerStats(newGuesses, won)
      hasWon.value = won
    }
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
              wins: userData.gameStats.fullstackleStats?.wins + (won ? 1 : 0),
              guesses: (userData.gameStats.fullstackleStats?.guesses || 0) + newGuesses,
              playedGames: (userData.gameStats.fullstackleStats?.playedGames || 0) + 1,
            },
          },
        })
      }
    }
  }

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

  return { hasWon, hasLost, checkTurnout, getStats }
})
