<template>
  <nav className="fs-nav">
    <ul>
      <NavLink href="/">Home</NavLink>
      <NavLink v-if="sessionStore.user" href="/fullstackle-game">Fullstackle</NavLink>
      <NavLink v-if="sessionStore.user" href="/find-ermin">Find Ermin</NavLink>
      <NavLink v-if="sessionStore.user" href="/leaderboard">Leaderboard</NavLink>
      <NavLink href="/about-us">About us</NavLink>
      <NavLink notActive v-if="!sessionStore.user" href="/">Login</NavLink>
      <NavLink
        notActive
        @click="sessionStore.logout"
        @keyup.enter="sessionStore.logout"
        v-else
        href="/"
        >Logout</NavLink
      >
    </ul>
  </nav>
</template>

<script setup lang="ts">
import NavLink from '../nav-link/NavLink.vue'
import { useSessionStore } from '@/stores/sessionStore'

const sessionStore = useSessionStore()
</script>

<style scoped lang="scss">
nav.fs-nav {
  ul {
    height: 100%;
    margin: 0;
    display: flex;
    padding: 0;
    list-style: none;
    font-weight: 500;
  }
}
</style>
