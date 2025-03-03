<template>
  <label v-if="props.inputLabel" :for="props.id">{{ props.inputLabel }}</label>
  <input
    :id="props.id"
    class="fs-input"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    :type="props.type"
    :value="modelValue"
    @input="
      (event) => {
        if (event.target) {
          emit('update:modelValue', (event.target as HTMLInputElement).value)
        }
      }
    "
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
interface Props {
  id: string
  inputLabel?: string
  placeholder?: string
  isDisabled?: boolean
  modelValue: string
  type: 'text' | 'number' | 'password' | 'email'
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
label {
  font-size: 16px;
  text-align: start;
}
.fs-input {
  width: auto;
  flex-grow: 2;
  padding: 0.5rem;
  font-size: 16px;
  font-weight: 400;
}
</style>
