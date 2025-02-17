<script setup lang="ts">
import HomePage from './home/HomePage.vue'
import FullstackleGame from './fullstackle-game/FullstackleGame.vue'
import PageHeader from './components/PageHeader.vue'
import SideNav from './components/SideNav.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <PageHeader />
  <SideNav />
  <main class="fs-main">
    <HomePage />
    <FullstackleGame />
  </main>
  <PageFooter />
</template>

<style scoped lang="scss">
.fs-main {
  padding: 52px 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: auto;
}
</style>
