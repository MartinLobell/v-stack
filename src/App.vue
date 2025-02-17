<script setup lang="ts">
import HomePage from './components/HomePage.vue'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <PageHeader />
  <aside></aside>
  <main>
    <HomePage />
  </main>
  <PageFooter />
</template>

<style scoped lang="scss"></style>
