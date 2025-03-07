<template>
  <form class="fs-login-signup-form" @submit="handleSubmit">
    <h2 class="fs-form-h2">{{ isLogin ? 'Log in' : 'Sign up' }}</h2>
    <InputField
      inputLabel="Email"
      placeholder="name@example.com"
      id="fs-login-email"
      type="email"
      v-model="email"
    />
    <InputField
      v-if="!isLogin"
      inputLabel="Username"
      placeholder="Username"
      id="fs-register-username"
      type="text"
      v-model="userName"
    />
    <InputField
      inputLabel="Password"
      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
      id="fs-login-password"
      type="password"
      v-model="password"
    />
    <div class="fs-btn-section">
      <FsButton type="submit" btnClass="primary">{{ isLogin ? 'Login' : 'Register' }}</FsButton>
      <FsButton @click="() => (isLogin = !isLogin)" type="button" btnClass="secondary"
        >Switch to {{ !isLogin ? 'login' : 'register' }}</FsButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import FsButton from '../../components/button/FsButton.vue'
import InputField from '../inputfield/InputField.vue'
import { useSessionStore } from '@/stores/sessionStore'
import { ref } from 'vue'
const sessionStore = useSessionStore()
const email = ref('')
const password = ref('')
const userName = ref('')
const isLogin = ref(true)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!email.value || !password.value) {
    alert('Please fill in all fields')
    return
  }
  if (isLogin.value) {
    sessionStore.login(email.value, password.value)
  } else {
    sessionStore.register(email.value, password.value, userName.value)
  }
}
</script>

<style scoped lang="scss">
.fs-login-signup-form {
  gap: 1rem;
  width: 20rem;
  background-color: #e3e3e3;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #e3e3e3, #ffffff);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .fs-form-h2 {
    margin: 0 0 0rem 0;
  }

  .fs-btn-section {
    margin: 2rem 0 1rem 0;
  }
}
</style>
