<template>
  <span class="fs-game-container" v-if="sessionStore.user">
    <h1>Fullstackle</h1>
    <p>FullstackJS1 Member Guessing game</p>
    <InputField />
    <GuessList />
  </span>
  <span v-else><h1>Apapapp, logga in då!</h1></span>
</template>

<script setup lang="ts">
import InputField from '@/components/inputfield/FsInputField.vue'
import GuessList from '@/components/guesslist/GuessList.vue'
import { useSessionStore } from '@/stores/sessionStore'

const sessionStore = useSessionStore()
</script>

<style scoped lang="scss">
.fs-game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
