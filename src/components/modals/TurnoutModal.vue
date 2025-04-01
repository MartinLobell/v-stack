<template>
  <div class="fs-modal-backdrop" @click="emitCloseModal()">
    <div class="fs-modal" @click.stop>
      <div>
        <h2 class="fs-modal-title">
          {{ hasWon ? 'You won!' : 'You lost...' }}
        </h2>
        <p class="fs-modal-text">
          You have {{ !hasWon ? 'not successfully ' : '' }}guessed the character of the day!
        </p>
        <h3>It was {{ characterName }}!</h3>
      </div>
      <StatsTable />

      <FsButton
        id="fs-turnout-modal-button"
        type="button"
        btnClass="primary"
        @click="emitCloseModal()"
        @keyup.tab="restrainFocus('#fs-turnout-modal-button')"
        >Close</FsButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import StatsTable from '@/components/stats-table/StatsTable.vue'
import FsButton from '@/components/button/FsButton.vue'
import { restrainFocus } from '@/composables/modalTab'
const emit = defineEmits(['close-modal'])

defineProps<{
  characterName: string
  hasWon: boolean
}>()

const emitCloseModal = () => {
  emit('close-modal')
}
onMounted(() => {
  const firstInteractiveElement = document.querySelector(
    '.fs-modal button, .fs-modal a, .fs-modal input, .fs-modal select, .fs-modal textarea',
  )
  if (firstInteractiveElement) {
    ;(firstInteractiveElement as HTMLElement).focus()
  }
})
</script>

<style scoped lang="scss">
.fs-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .fs-modal {
    background-color: #fff;
    border-radius: 8px;
    width: 300px;
    height: auto;
    padding: 40px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .fs-modal-button {
    background-color: #ffd900;
    color: #000;
    padding: 10px 20px;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      transition: 0.3s;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
