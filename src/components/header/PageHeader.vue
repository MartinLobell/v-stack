<script setup lang="ts">
import HeaderNav from './HeaderNav.vue'
import NavLink from '../NavLink.vue'
</script>

<template>
  <header className="fs-header">
    <div className="fs-site-title" role="heading" aria-level="1">
      <NavLink :notActive="true" href="/">FullstackJS Arcade</NavLink>
    </div>
    <HeaderNav />
  </header>
</template>

<style scoped lang="scss">
.fs-header {
  width: 100vw;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 1;
  background-color: #f3f3f3;
  position: absolute;
  padding: 0 30px;

  .fs-site-title {
    display: flex;
    align-items: center;
    font-weight: 700;
  }
}
</style>
