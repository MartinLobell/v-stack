<script setup lang="ts">
import NavLink from '../NavLink.vue'
</script>

<template>
  <nav className="fs-nav">
    <ul>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/about-us">About us</NavLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav.fs-nav {
  ul {
    display: flex;
    padding: 0;
    align-items: center;
    gap: 2rem;
    list-style: none;
    font-weight: 500;

    li {
      a {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
