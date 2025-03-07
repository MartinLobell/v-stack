<template>
  <div class="home">
    <h1>Vüllstack Homepage</h1>
    <p>You are welcome</p>
    <LoginForm v-if="!sessionStore.isLoggedIn" />
    <h2 v-else>Hello, {{ sessionStore.user.userName }}!</h2>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue'
import { useSessionStore } from '@/stores/sessionStore'
const sessionStore = useSessionStore()
</script>

<style scoped lang="scss">
.home {
  h1 {
    margin-bottom: 0;
  }
  p {
    margin: 1rem 0 1.75rem 0;
  }
}
</style>
