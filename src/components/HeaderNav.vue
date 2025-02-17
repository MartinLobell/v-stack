<script lang="ts">
export default {
  name: 'HeaderNav',
}
</script>

<template>
  <nav className="fs-nav">
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about-us">About us</a>
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
