<template>
  <span class="skip-to-main" tabindex="0" @click="skipToMain" @keyup.enter="skipToMain">
    Skip to main content
  </span>
</template>

<script setup lang="ts">
const skipToMain = () => {
  const main = document.querySelector('main')
  if (main) {
    main.focus()
  }
}
</script>

<style lang="scss" scoped>
.skip-to-main {
  position: absolute;
  top: -60px;
  left: 20px;
  background: #ffd900;
  border: solid 0.5rem #000;
  color: #000;
  padding: 8px;
  z-index: 100;
  &:focus {
    transition: 0.2s;
    top: 20px;
  }
}
</style>
