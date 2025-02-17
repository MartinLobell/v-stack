<script lang="ts">
export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
}
</script>

<template>
  <div class="home">
    <h1>Fullstackle Homepage</h1>
    <p>You are welcome</p>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
