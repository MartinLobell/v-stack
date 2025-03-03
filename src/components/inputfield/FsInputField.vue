<template>
  <form class="fs-fullstackle-form" @submit.prevent="handleSubmit">
    <div class="fs-fullstackle-form-field">
      <input
        class="fs-input"
        :disabled="fullstackleStore.hasWon || fullstackleStore.hasLost"
        type="text"
        v-model="inputValue"
        @input="
          (event) => {
            if (event.target) {
              inputValue = (event.target as HTMLInputElement).value
              filterOptions()
            }
          }
        "
        @keydown.enter="handleSubmit"
      />
    </div>
    <DropDown
      v-if="isOpen"
      :options="characterStore.filteredCharacters"
      @select="handleSubmit"
      @click-outside="isOpen = false"
    />
  </form>
</template>

<script setup lang="ts">
import DropDown from '@/components/dropdown/DropDown.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useFullstackleStore } from '@/stores/fullstackleStore'
import { ref } from 'vue'
import type { Character } from '@/types/Character'
const inputValue = ref('')
const isOpen = ref(false)
const characterStore = useCharacterStore()
const fullstackleStore = useFullstackleStore()

const handleSubmit = (option: string | Event) => {
  if (typeof option === 'string') {
    characterStore.addGuessedCharacter(option)
  } else {
    option.preventDefault()
    const inputOption = (option.target as HTMLFormElement).querySelector('input')?.value
    if (inputOption !== undefined) {
      characterStore.addGuessedCharacter(inputOption)
    } else {
      characterStore.addGuessedCharacter(inputValue.value)
    }
  }
  isOpen.value = false
  inputValue.value = ''
  const inputElement = document.querySelector('.fs-input') as HTMLInputElement
  if (inputElement) {
    inputElement.focus()
  }
}

const filterOptions = () => {
  const matchingCharacters = characterStore.characters.filter((character: Character) =>
    character.name.toLowerCase().includes(inputValue.value.toLowerCase()),
  )
  characterStore.setDropdownChars(matchingCharacters)
  if (inputValue.value === '') {
    isOpen.value = false
  }
  if (inputValue.value.length < 2) {
    isOpen.value = true
  }
}
</script>

<style scoped lang="scss">
.fs-fullstackle-form {
  width: 50%;

  &-field {
    display: flex;
    flex-direction: row;
    .fs-input {
      flex-grow: 2;
      padding: 0.5rem;
      font-size: 16px;
      font-weight: 600;

      &:focus {
        outline: #000 solid 2px;
      }
    }
  }
}
</style>
