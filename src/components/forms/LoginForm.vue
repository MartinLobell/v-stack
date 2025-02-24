<template>
  <form class="fs-login-signup-form">
    <h2 class="fs-form-h2">Login</h2>
    <label for="fs-login-email">Email</label>
    <input
      placeholder="name@example.com"
      id="fs-login-email"
      class="fs-login-input"
      label="Email"
      type="email"
    />
    <label for="fs-login-password">Password</label>
    <input
      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
      id="fs-login-password"
      class="fs-login-input"
      label="Password"
      type="password"
    />
    <div class="fs-btn-section">
      <FsButton
        @click="
          () => {
            console.log('Login')
          }
        "
        type="submit"
        btnClass="primary"
        >Login</FsButton
      >
      <FsButton
        @click="
          () => {
            console.log('Switch')
          }
        "
        type="button"
        btnClass="secondary"
        >Switch</FsButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import FsButton from '../../components/button/FsButton.vue'
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

  label {
    font-size: 16px;
    text-align: start;
  }

  .fs-login-input {
    flex-grow: 2;
    padding: 0.5rem;
    font-size: 16px;
    font-weight: 400;

    &:focus-visible {
      outline: none;
    }
  }

  .fs-btn-section {
    margin: 2rem 0 1rem 0;
  }
}
</style>
