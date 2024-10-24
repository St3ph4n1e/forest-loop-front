<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import socket from '@/socket-io/socket'
import Header from '../../components/Header/Header.vue'
import type { GridCase } from '../../types/gridCase'

const rules = ref([])
//const visibleRules = ref(30);
const gridSize = { rows: 11, cols: 11 }
const centerX = Math.floor(gridSize.cols / 2)
const centerY = Math.floor(gridSize.rows / 2)
const gridCases = ref<GridCase[]>([])
const redPointPosition = ref({ x: 0, y: 0 })
const isModalOpen = ref(false)

onMounted(() => {
  const tempGridCases = []
  for (let y = 0; y < gridSize.rows; y++) {
    for (let x = 0; x < gridSize.cols; x++) {
      let relX = x - centerX
      let relY = centerY - y
      tempGridCases.push({ id: `${relX}.${relY}`, x: relX, y: relY })
    }
  }
  gridCases.value = tempGridCases

  socket.on('player coords', ({ x, y }) => {
    redPointPosition.value = { x, y }
  })

  socket.on('send rules', newRules => {
    console.log(newRules)
    rules.value = newRules
  })
})

onUnmounted(() => {
  socket.off('player coords')
})

const toggleModal = (isOpen: boolean) => {
  isModalOpen.value = isOpen
}

//const sendCoords = () => {
//socket.emit('player coords', { x: 4, y: 0 })
//}
</script>

<template>
  <Header @modal-toggle="toggleModal"></Header> />
  <div v-show="!isModalOpen" class="container">
    <div class="left-pane">
      <div class="grid-map">
        <div
          v-for="gridCase in gridCases"
          :key="gridCase.id"
          :id="gridCase.id"
          class="grid-case"
          :class="{
            'red-point':
              gridCase.x === redPointPosition.x &&
              gridCase.y === redPointPosition.y,
          }"
        ></div>
      </div>
    </div>
    <div class="right-pane">
      <h2 class="title">Règles</h2>
      <div
        class="card"
        v-for="(rule, index) in rules"
        :key="index"
        :style="{ '--rules-index': index + 1 }"
      >
        <div class="face face1">
          <div class="content">
            <span class="stars"></span>
            <p class="gamer-font">{{ rule }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./GamePlay.css" lang="css" scoped></style>
