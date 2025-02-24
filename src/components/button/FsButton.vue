<template>
  <button @click="onClick()" class="fs-button" :class="[btnClass, { disabled: disabled }]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    validator: (value: string) => ['submit', 'button', 'reset'].includes(value),
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  onClick: {
    type: Function,
    required: true,
  },
  btnClass: {
    type: String,
    validator: (value: string) => ['primary', 'secondary'].includes(value),
    required: true,
  },
})
</script>

<style scoped lang="scss">
.fs-button {
  border: none;
  border-radius: 10px;
  padding: 0.75rem;
  width: 85%;
  margin: 0.5rem 0;
  font-weight: 700;
  cursor: pointer;
  &.primary {
    background-color: rgb(255, 204, 0);
    color: #000;
    &:hover {
      outline: 2px solid #000;
    }
  }
  &.secondary {
    background-color: #000;
    color: rgb(255, 204, 0);
    &:hover {
      transition: 0.2s;
      opacity: 0.8;
    }
  }
}
</style>
