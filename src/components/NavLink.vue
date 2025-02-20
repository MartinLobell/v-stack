<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  href: string
  notActive?: boolean
}>()

const isActive = ref(false)
const route = useRoute()

watch(
  () => [props.href, route.path],
  () => {
    isActive.value =
      props.href === '/' ? route.path === props.href : route.path.includes(props.href)
  },
  { immediate: true },
)
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
