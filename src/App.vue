<script setup lang="ts">
import PageHeader from './components/header/PageHeader.vue'
import PageFooter from './components/footer/PageFooter.vue'
</script>

<template>
  <PageHeader />
  <main class="fs-main">
    <router-view />
  </main>
  <PageFooter />
</template>

<style scoped lang="scss">
.fs-main {
  padding: 3.35rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>
