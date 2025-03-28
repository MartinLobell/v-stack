<template>
  <div class="text-box" :class="{ disabled: hasPlayed }">
    <h1 v-if="!hasPlayed">Find Ermin</h1>
    <h1 v-else>Ermin was found!</h1>
    <p v-if="!hasPlayed">
      Ermin is hiding from work among these nice people.<br />
      Find him before the time runs out!
    </p>
    <p v-else>
      Ermin has been found today and was forcefully<br />
      brought back to his desk but come back tomorrow,<br />
      he will probably hide again!
    </p>
    <h2 v-if="!hasPlayed">Timer: {{ timer }}s.</h2>
    <h2 v-else>Your time: {{ timer }}s.</h2>
  </div>
  <div class="container" :class="{ disabled: hasPlayed }">
    <canvas ref="canvas" @click="handleClick"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useFindErminStore } from '@/stores/findErminStore'
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const backgroundImages = ['/faces1.jpg', '/faces2.jpg']
const faceImagePath = '/ermin2.PNG'
const findErminStore = useFindErminStore()
const hasPlayed = ref(false)
const currentDate = new Date().toDateString()
const timer = ref(0)
let intervalId: number | null = null

const startTimer = () => {
  intervalId = setInterval(() => {
    timer.value++
  }, 1000)
}

const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  const lastPlayDate = localStorage.getItem('lastFindErminDate')
  if (lastPlayDate !== currentDate) {
    hasPlayed.value = false
    startTimer()
    localStorage.setItem('lastFindErminDate', currentDate)
  } else {
    hasPlayed.value = true
    alert('You already played!')
  }
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    drawImages(true)
  }
})

const faceOverlay = ref({
  x: 150,
  y: 200,
  width: 70,
  height: 80,
})

const randomBg = ref('')

const drawImages = async (isNewSession: boolean) => {
  const bg = new Image()
  const face = new Image()

  randomBg.value = backgroundImages[Math.floor(Math.random() * backgroundImages.length)]

  bg.src = randomBg.value
  face.src = faceImagePath

  await Promise.all([
    new Promise((res) => (bg.onload = res)),
    new Promise((res) => (face.onload = res)),
  ])

  if (ctx.value) {
    if (isNewSession) {
      ctx.value.drawImage(bg, 0, 0, canvas.value!.width, canvas.value!.height)
      faceOverlay.value.x = Math.random() * (canvas.value!.width - faceOverlay.value.width)
      faceOverlay.value.y = Math.random() * (canvas.value!.height - faceOverlay.value.height)
      ctx.value.drawImage(
        face,
        faceOverlay.value.x,
        faceOverlay.value.y,
        faceOverlay.value.width,
        faceOverlay.value.height,
      )
    } else {
      ctx.value.drawImage(
        face,
        faceOverlay.value.x - 50,
        faceOverlay.value.y - 50,
        faceOverlay.value.width * 3,
        faceOverlay.value.height * 3,
      )
    }
  }
}

watch(timer, (newVal: number) => {
  if (newVal >= 10) {
    stopTimer()
    if (canvas.value) {
      canvas.value.style.pointerEvents = 'none'
    }
    drawImages(false)
    alert('You ran out of time!')
    findErminStore.updatePlayerStats(timer.value, false)
  }
})

const handleClick = (event: MouseEvent) => {
  console.log(hasPlayed.value)
  if (!hasPlayed.value) {
    if (canvas.value) {
      const rect = canvas.value.getBoundingClientRect()
      const x = (event.clientX - rect.left) * (canvas.value.width / rect.width)
      const y = (event.clientY - rect.top) * (canvas.value.height / rect.height)

      const { x: fx, y: fy, width, height } = faceOverlay.value

      if (x >= fx && x <= fx + width && y >= fy && y <= fy + height) {
        alert('You clicked the face!')
        findErminStore.updatePlayerStats(timer.value, true)
      } else {
        alert('You missed the face!')
        findErminStore.updatePlayerStats(timer.value, false)
      }
    }
    stopTimer()
    localStorage.setItem('lastFindErminDate', currentDate)
    canvas.value!.style.pointerEvents = 'none'
    drawImages(false)
    hasPlayed.value = true
  }
}
</script>

<style scoped lang="scss">
.text-box {
  position: absolute;
  margin-top: 10px;
  z-index: 1;
  color: #fff;
  &.disabled {
    padding: 2rem;
    background-color: #fff;
    color: #000;
    border-radius: 20px;
    opacity: 0.7;
  }
  h1 {
    margin: 0;
  }
  h2,
  p {
    margin-bottom: 0;
    font-weight: 600;
  }
}
.container {
  text-align: center;
  &.disabled {
    pointer-events: none;
    canvas {
      opacity: 0.7;
    }
  }
  canvas {
    border: 2px solid #333;
    cursor: pointer;
    width: 100vw;
    height: 100vh;
    position: relative;
  }
}
</style>
