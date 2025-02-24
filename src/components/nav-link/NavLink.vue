<template>
  <router-link
    :to="props.href"
    class="nav-link"
    :class="[{ active: isActive }, { logo: props.isLogo }]"
  >
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  href: string
  isLogo?: boolean
}>()

const isActive = ref(false)
const route = useRoute()

watch(
  () => [props.href, route.path],
  () => {
    if (props.isLogo === true) {
      isActive.value = false
    } else {
      isActive.value =
        props.href === '/' ? route.path === props.href : route.path.includes(props.href)
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.nav-link {
  text-decoration: none;
  color: #000;
  &:hover {
    transition: 0.2s;
    color: rgb(255, 204, 0);
  }
  &.logo {
    font-size: 24px !important;
    &:hover {
      color: #000;
    }
  }
  &.active {
    color: rgb(255, 204, 0);
    text-decoration: underline;
    font-weight: 700;
  }
}
</style>
