<template>
  <h1>Find Ermin</h1>
  <p>Ermin is hiding from work among these nice people.<br />Find him before the time runs out!</p>
  <h2>Timer: {{ timer }}s.</h2>
  <div class="container">
    <canvas ref="canvas" width="600" height="600" @click="handleClick"></canvas>
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
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    drawImages(true)
    startTimer()
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
  canvas.value!.style.pointerEvents = 'none'
  drawImages(false)
}
</script>

<style scoped lang="scss">
h1,
h2,
p {
  margin-bottom: 0;
}
.container {
  text-align: center;
  margin-top: 20px;
  canvas {
    border: 2px solid #333;
    cursor: pointer;
  }
}
</style>
