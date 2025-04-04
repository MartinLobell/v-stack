import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/types/Character'
import { onMounted } from 'vue'
import { fetchChars, getCharOfTheDay } from '@/api/getData'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useFullstackleStore } from './fullstackleStore'

export const useCharacterStore = defineStore('character', () => {
  const fullstackleStore = useFullstackleStore()
  const characters = ref<Character[]>([])
  const charOfTheDay = ref<Character>({} as Character)
  const loading = ref(false)
  const guessedCharacters = ref([] as Character[])

  onMounted(() => {
    if (fullstackleStore.checkIfPlayedToday()) {
      localStorage.setItem('guessedCharacters', JSON.stringify([]))
    }

    const storedGuessedCharacters = localStorage.getItem('guessedCharacters')
    if (storedGuessedCharacters) {
      guessedCharacters.value = JSON.parse(storedGuessedCharacters)
    }
  })

  onMounted(() => {
    const getCharacterData = async () => {
      try {
        const charactersData: Character[] = await fetchChars()
        characters.value = charactersData
        charOfTheDay.value = await getCharOfTheDay()
      } catch (err: unknown) {
        console.error('Failed to fetch characters', err)
        toast.error('Failed to fetch characters')
      } finally {
        loading.value = false
      }
    }

    getCharacterData()
  })

  const addGuessedCharacter = (characterName: string) => {
    if (characters.value.length === 0) {
      throw new Error('No characters available to guess')
    }
    const character = characters.value.find(
      (char) => (char as Character).name.toLowerCase() === characterName.toLowerCase(),
    )
    if (!character) {
      toast.error(`Character with name ${characterName} not found`)
    }
    guessedCharacters.value = [...guessedCharacters.value, character as Character]
  }

  return {
    characters,
    charOfTheDay,
    loading,
    addGuessedCharacter,
    guessedCharacters,
  }
})
