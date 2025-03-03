import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateFullstackleStats } from '../api/getData'
import type { User } from '../types/User'

export const useFullstackleStore = defineStore('fullstackle', () => {
  const hasWon = ref(false)
  const hasLost = ref(false)

  const checkTurnout = (won: boolean, user: User, newGuesses: number) => {
    hasWon.value = won
    if (won) {
      updateFullstackleStats(user, newGuesses + user.fullstackleStats.guesses)
    }
    if (newGuesses >= 3) {
      hasLost.value = true
    }
  }

  return { hasWon, hasLost, checkTurnout }
})
