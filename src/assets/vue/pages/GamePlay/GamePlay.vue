<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import socket from '@/socket-io/socket'

const visibleRules = ref(0);
const gridSize = { rows: 11, cols: 11 };
const centerX = Math.floor(gridSize.cols / 2);
const centerY = Math.floor(gridSize.rows / 2);
const gridCases = ref([]);
const redPointPosition = ref({ x: 0, y: 0 });

const showNextRule = () => {
  if (visibleRules.value < 5) {
    visibleRules.value += 1
  }
}

const moveRedPoint = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (redPointPosition.value.y < centerY) redPointPosition.value.y += 1;
      break;
    case 'ArrowDown':
      if (redPointPosition.value.y > -centerY) redPointPosition.value.y -= 1;
      break;
    case 'ArrowLeft':
      if (redPointPosition.value.x > -centerX) redPointPosition.value.x -= 1;
      break;
    case 'ArrowRight':
      if (redPointPosition.value.x < centerX) redPointPosition.value.x += 1;
      break;
  }
};

onMounted(() => {
  const tempGridCases = [];
  for (let y = 0; y < gridSize.rows; y++) {
    for (let x = 0; x < gridSize.cols; x++) {
      let relX = x - centerX;
      let relY = centerY - y;
      tempGridCases.push({ id: `${relX}.${relY}`, x: relX, y: relY });
    }
  }
  gridCases.value = tempGridCases;

  // Set random initial position for the red point
  // redPointPosition.value = {
    // x: Math.floor(Math.random() * gridSize.cols) - centerX,
    // y: centerY - Math.floor(Math.random() * gridSize.rows)
  // };


  // Set constant initial position for the red point
  redPointPosition.value = { x: -5, y: -5 };

  window.addEventListener('keydown', moveRedPoint);
});

onUnmounted(() => {
  // window.removeEventListener('keydown', moveRedPoint)
  socket.off('player coords')
})
</script>

<template>
  <div class="container" @click="showNextRule">
    <div class="left-pane">
      <div class="grid-map">
        <div
          v-for="gridCase in gridCases"
          :key="gridCase.id"
          :id="gridCase.id"
          class="grid-case"
          :class="{ 'red-point': gridCase.x === redPointPosition.x && gridCase.y === redPointPosition.y }"
          :data-x="gridCase.x"
          :data-y="gridCase.y"
        ></div>
      </div>
    </div>
    <div class="right-pane">
      <h2 class="title">Règles</h2>
      <div
        class="card"
        v-for="n in 5"
        :key="n"
        :style="{ '--rule-index': n }"
        v-show="n <= visibleRules"
      >
        <div class="face face1">
          <div class="content">
            <span class="stars"></span>
            <p class="gamer-font">Si il y a un gros caillou rouge à gauche de l'écran, aller à droite et ne pas aller à gauche.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./GamePlay.css" lang="css" scoped></style>
