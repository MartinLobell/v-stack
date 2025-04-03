<template>
  <li :class="{ active: isActive }">
    <router-link :to="props.href" class="nav-link" :class="[{ logo: props.logo }]">
      <slot></slot>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  href: string
  logo?: boolean
  notActive?: boolean
}>()

const isActive = ref(false)
const route = useRoute()

watch(
  () => [props.href, route.path],
  () => {
    if (props.notActive === true) {
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
li {
  height: 100%;
  width: 120px;
  text-decoration: none;
  display: flex;
  &.active {
    background-color: rgb(255, 204, 0);
    text-decoration: none;
    font-weight: 700;
  }
  a.nav-link {
    height: 100%;
    width: 100%;
    padding: 0 10px;
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    &:focus {
      outline: #000 solid 2px;
    }
    &:hover {
      text-decoration: underline;
    }
    &.logo {
      font-size: 24px !important;
      text-decoration: none;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
