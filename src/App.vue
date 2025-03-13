<script setup lang="ts">
import PageHeader from './components/header/PageHeader.vue'
import PageFooter from './components/footer/PageFooter.vue'
import SkipToMain from './components/skip-to-main/SkipToMain.vue'
</script>

<template>
  <SkipToMain />
  <PageHeader />
  <main class="fs-main">
    <router-view />
  </main>
  <PageFooter />
</template>

<style scoped lang="scss">
.fs-main {
  margin: 59.2px 8rem 0 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>
