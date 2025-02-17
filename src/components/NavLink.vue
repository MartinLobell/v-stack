<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  href: string
}>()
</script>

<template>
  <a :href="props.href" class="nav-link"><slot></slot></a>
</template>

<style scoped lang="sass"></style>
