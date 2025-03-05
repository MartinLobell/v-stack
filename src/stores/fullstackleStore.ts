import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateFullstackleStats } from '../api/getData'
import type { User } from '../types/User'
import { useSessionStore } from './sessionStore'

export const useFullstackleStore = defineStore('fullstackle', () => {
  const hasWon = ref(false)
  const hasLost = ref(false)
  const sessionStore = useSessionStore()

  const checkTurnout = async (won: boolean, user: User, newGuesses: number) => {
    if (newGuesses >= 3) {
      updateGame(user, newGuesses, won)
      hasLost.value = true
    }
    if (won === true) {
      updateGame(user, newGuesses, won)
      hasWon.value = won
    }
  }

  const updateGame = (user: User, newGuesses: number, won: boolean) => {
    updateFullstackleStats(user, newGuesses, won)
      .then(() => sessionStore.updateUser(user.email))
      .finally(() => console.log(JSON.stringify(sessionStore.user)))
  }

  return { hasWon, hasLost, checkTurnout }
})
