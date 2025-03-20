<template>
  <nav className="fs-nav">
    <ul>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li v-if="sessionStore.user">
        <NavLink href="/fullstackle-game">Fullstackle</NavLink>
      </li>
      <li v-if="sessionStore.user">
        <NavLink href="/find-ermin">Find Ermin</NavLink>
      </li>
      <li v-if="sessionStore.user">
        <NavLink href="/leaderboard">Leaderboard</NavLink>
      </li>
      <li>
        <NavLink href="/about-us">About us</NavLink>
      </li>
      <li>
        <NavLink notActive v-if="!sessionStore.user" href="/">Login</NavLink>
        <NavLink
          @click="sessionStore.logout"
          @keyup.enter="sessionStore.logout"
          notActive
          v-if="sessionStore.user"
          href="/"
          >Logout</NavLink
        >
      </li>
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
      .logout-btn {
        cursor: pointer;
        &:hover {
          transition: 0.2s;
          color: rgb(255, 204, 0);
        }
      }
    }
  }
}
</style>
