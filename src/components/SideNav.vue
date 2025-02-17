<template>
  <aside className="fs-side">
    <nav className="fs-side-nav">
      <ul className="fs-side-nav-list">
        <li className="fs-side-nav-list-item">
          <NavLink href="/fullstackle-game">Fullstackle</NavLink>
        </li>
        <li className="fs-side-nav-list-item">
          <NavLink href="#">Find Ermin</NavLink>
        </li>
        <li className="fs-side-nav-list-item">
          <NavLink href="#">JS-characters</NavLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue'
</script>

<style scoped lang="scss">
.fs-side {
  width: 160px;
  position: absolute;
  top: 0;
  bottom: 0;
  background: transparent;
  left: 0;
  bottom: 0;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  padding: 90px 30px;
  &-nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;

    &-list {
      flex-grow: 1;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 3rem;

      &-item {
        list-style: armenian;
        list-style-position: inside;
        &::marker {
          color: #ffd900;
          font-size: 26px;
        }
        a {
          color: #000;
          text-decoration: none;
          font-size: 16px;
          &:hover {
            transition: 0.3s;
            color: #ffd900;
          }
        }
      }
    }
  }
}
</style>
