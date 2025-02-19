<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  href: string
  notActive?: boolean
}>()

const isActive = computed(() => {
  if (props.notActive) {
    return false
  }
  if (props.href === '/') {
    return window.location.pathname === props.href
  }
  return window.location.pathname.includes(props.href)
})
</script>

<template>
  <router-link :to="props.href" class="nav-link" :class="{ active: isActive }">
    <slot></slot>
  </router-link>
</template>

<style scoped lang="scss">
.nav-link {
  text-decoration: none;
  color: #000;
  &:hover {
    transition: 0.2s;
    color: rgb(255, 204, 0);
  }
  &.active {
    color: rgb(255, 204, 0);
    text-decoration: underline;
    font-weight: 700;
  }
}
</style>
