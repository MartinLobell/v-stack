import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character } from '@/types/Character'
import { onMounted } from 'vue'
import { fetchChars } from '@/api/getData'

export const useCharacterStore = defineStore('character', () => {
  const characters = ref<Character[]>([])
  const filteredCharacters = ref([''])
  const charOfTheDay = ref<Character>({} as Character)
  const loading = ref(false)
  const error = ref(null)
  const guessedCharacters = ref([] as Character[])

  onMounted(() => {
    const getCharacterData = async () => {
      try {
        const charactersData: Character[] = await fetchChars()
        characters.value = charactersData
        const randomIndex = Math.floor(Math.random() * characters.value.length)
        charOfTheDay.value = characters.value[randomIndex] as Character
        console.log('Hej! ', charOfTheDay.value)
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

  const setDropdownChars = (matchChars: Character[]) => {
    filteredCharacters.value = matchChars.map((char) => char.name)
  }

  return {
    characters,
    filteredCharacters,
    setDropdownChars,
    charOfTheDay,
    loading,
    error,
    addGuessedCharacter,
    guessedCharacters,
  }
})
