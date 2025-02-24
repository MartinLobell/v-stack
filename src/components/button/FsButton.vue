<template>
  <button
    @click="onClick()"
    class="fs-button"
    :class="[{ small: small }, btnClass, { disabled: disabled }]"
  >
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
  small: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<style scoped lang="scss">
.fs-button {
  border: none;
  border-radius: 10px;
  padding: 0.75rem;
  width: 100%;
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
  &.small {
    width: 50%;
    padding: 0.75rem;
    font-size: 12px;
  }
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
