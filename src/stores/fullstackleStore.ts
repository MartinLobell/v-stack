import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFullstackleStore = defineStore('fullstackle', () => {
  const hasWon = ref(false)

  const checkIfWon = (won: boolean) => {
    hasWon.value = won
  }

  return { hasWon, checkIfWon }
})
