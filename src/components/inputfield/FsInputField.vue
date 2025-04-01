<template>
  <form class="fs-fullstackle-form" @submit.prevent="handleSubmit">
    <div class="fs-fullstackle-form-field">
      <input id="fs-input" type="text" v-model="inputValue" @keydown.enter="handleSubmit" />
    </div>
    <DropDown
      v-if="isOpen"
      :options="characterOptions"
      @select="handleSubmit"
      @click-outside="isOpen = false"
    />
  </form>
</template>

<script setup lang="ts">
import DropDown from '@/components/dropdown/DropDown.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { ref, computed } from 'vue'
import type { Character } from '@/types/Character'
const inputValue = ref('')
const characterStore = useCharacterStore()
const isOpen = computed(() => inputValue.value.length > 1)
// TODO: Make disabled work based on localStorage hasPlayed
// const hasPlayed = computed(() => {
//   if (typeof window !== 'undefined' && window.localStorage) {
//     return !!window.localStorage.getItem('hasPlayed')
//   }
//   return false
// })

// Filter characters based on inputValue and exclude guessed characters
const characterOptions = computed(() =>
  characterStore.characters.filter(
    (character: Character) =>
      character.name.toLowerCase().includes(inputValue.value.toLowerCase()) &&
      !characterStore.guessedCharacters.some(
        (guessedCharacter) => guessedCharacter.name === character.name,
      ),
  ),
)

// Handle chosen character
const handleSubmit = (event: Event | string) => {
  if (typeof event === 'string') {
    characterStore.addGuessedCharacter(event)
  } else {
    event.preventDefault()
    if (inputValue.value.trim()) {
      characterStore.addGuessedCharacter(inputValue.value.trim())
    }
  }
  inputValue.value = ''
  document.getElementById('fs-input')?.focus()
}
</script>

<style scoped lang="scss">
.fs-fullstackle-form {
  width: 50%;

  &-field {
    display: flex;
    flex-direction: row;
    #fs-input {
      flex-grow: 2;
      padding: 0.5rem;
      font-size: 16px;
      font-weight: 600;

      &.disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      &:focus {
        outline: #000 solid 2px;
      }
    }
  }
}
</style>
