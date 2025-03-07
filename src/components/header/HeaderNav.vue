<template>
  <nav className="fs-nav">
    <ul>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li v-if="sessionStore.isLoggedIn">
        <NavLink href="/fullstackle-game">Fullstackle</NavLink>
      </li>
      <li v-if="sessionStore.isLoggedIn">
        <NavLink href="/leaderboard">Leaderboard</NavLink>
      </li>
      <li>
        <NavLink href="/about-us">About us</NavLink>
      </li>
      <li>
        <NavLink notActive v-if="!sessionStore.isLoggedIn" href="/">Login &#128512;</NavLink>
        <NavLink
          @click="sessionStore.logout"
          @keyup.enter="sessionStore.logout"
          notActive
          v-if="sessionStore.isLoggedIn"
          href="/"
          >Logout &#128128;</NavLink
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
