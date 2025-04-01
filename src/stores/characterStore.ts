import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/types/Character'
import { onMounted } from 'vue'
import { fetchChars, getCharOfTheDay } from '@/api/getData'

export const useCharacterStore = defineStore('character', () => {
  const characters = ref<Character[]>([])
  const charOfTheDay = ref<Character>({} as Character)
  const loading = ref(false)
  const error = ref(null)
  const guessedCharacters = ref([] as Character[])

  onMounted(() => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: object[] | any) {
        error.value = err
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
      throw new Error(`Character with name ${characterName} not found`)
    }
    guessedCharacters.value = [...guessedCharacters.value, character as Character]
  }

  return {
    characters,
    charOfTheDay,
    loading,
    error,
    addGuessedCharacter,
    guessedCharacters,
  }
})
