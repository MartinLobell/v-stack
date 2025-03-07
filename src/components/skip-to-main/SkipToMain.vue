<template>
  <span class="skip-to-main" tabindex="0" @click="skipToMain" @keyup.enter="skipToMain">
    Skip to main content
  </span>
</template>

<script setup lang="ts">
const skipToMain = () => {
  const main = document.getElementsByTagName('main')[0]
  if (main) {
    const focusableElements = main.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    )
    if (focusableElements.length > 0) {
      ;(focusableElements[0] as HTMLElement).focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.skip-to-main {
  position: absolute;
  top: -70px;
  left: 20px;
  background: #ffd900;
  border: solid 0.25rem #000;
  color: #000;
  padding: 1rem;
  z-index: 100;
  &:focus {
    transition: 0.2s;
    top: 20px;
    text-decoration: underline;
  }
}
</style>
