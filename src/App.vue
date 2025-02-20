<script setup lang="ts">
import PageHeader from './components/header/PageHeader.vue'
import SideNav from './components/sidenav/SideNav.vue'
import PageFooter from './components/footer/PageFooter.vue'
</script>

<template>
  <PageHeader />
  <SideNav />
  <main class="fs-main">
    <router-view />
  </main>
  <PageFooter />
</template>

<style scoped lang="scss">
.fs-main {
  padding: 52px 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: auto;
}
</style>
