<template>
  <form class="fs-login-signup-form">
    <h2 class="fs-form-h2">Log in with Google</h2>
    <div v-if="!sessionStore.user">
      <div class="fs-btn-section">
        <FsButton btnClass="primary" type="button" @click="sessionStore.signInWithGoogle"
          >Sign in with Google</FsButton
        >
      </div>
    </div>
    <div v-else>
      <p>Welcome, {{ sessionStore.user.displayName }}</p>
      <img
        class="fs-profile-image"
        :src="sessionStore.user.photoURL || ''"
        alt="Profile Picture"
        width="100"
      />
      <div class="fs-btn-section">
        <FsButton btnClass="primary" type="button" @click="sessionStore.logout">Logout</FsButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import FsButton from '../../components/button/FsButton.vue'
import { useSessionStore } from '@/stores/sessionStore'
const sessionStore = useSessionStore()
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
  .fs-profile-image {
    border-radius: 50%;
  }
}
.auth-container {
  text-align: center;
  margin-top: 20px;
}
</style>
