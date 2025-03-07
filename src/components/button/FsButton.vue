<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    @click="
      props.onClick
        ? props.onClick()
        : () => {
            return
          }
    "
    class="fs-button"
    :class="[{ small: props.small }, props.btnClass, { disabled: props.disabled }]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  type: 'submit' | 'button' | 'reset'
  disabled?: boolean
  onClick?: () => void
  btnClass: 'primary' | 'secondary'
  small?: boolean
}
const props = defineProps<ButtonProps>()
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
  &:focus {
    outline: #000 solid 2px;
    border: 2px solid #fff;
  }
  &.secondary {
    background-color: rgb(255, 204, 0);
    color: #000;
    &:hover {
      outline: 2px solid #000;
    }
  }
  &.primary {
    background-color: #000;
    color: rgb(255, 204, 0);
    &:hover {
      transition: 0.2s;
      opacity: 0.6;
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
