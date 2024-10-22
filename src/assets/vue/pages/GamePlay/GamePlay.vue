<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const visibleRules = ref(0);
const gridSize = 11;
const redPointPosition = ref(Math.floor(gridSize * gridSize / 2));

const showNextRule = () => {
  if (visibleRules.value < 5) {
    visibleRules.value += 1;
  }
};

const moveRedPoint = (event: KeyboardEvent) => {
  const row = Math.floor(redPointPosition.value / gridSize);
  const col = redPointPosition.value % gridSize;

  switch (event.key) {
    case 'ArrowUp':
      if (row > 0) redPointPosition.value -= gridSize;
      break;
    case 'ArrowDown':
      if (row < gridSize - 1) redPointPosition.value += gridSize;
      break;
    case 'ArrowLeft':
      if (col > 0) redPointPosition.value -= 1;
      break;
    case 'ArrowRight':
      if (col < gridSize - 1) redPointPosition.value += 1;
      break;
  }
};

onMounted(() => {
  window.addEventListener('keydown', moveRedPoint);
});

onUnmounted(() => {
  window.removeEventListener('keydown', moveRedPoint);
});
</script>

<template>
  <div class="container" @click="showNextRule">
    <div class="left-pane">
      <div class="grid-map">
        <div
          class="grid-case"
          v-for="n in gridSize * gridSize"
          :key="n"
          :id="'grid-' + n">
          <div v-if="n - 1 === redPointPosition" class="red-point"></div>
        </div>
      </div>
    </div>
    <div class="right-pane">
      <h2 class="title">Règle</h2>
      <div
        class="card"
        v-for="n in 5"
        :key="n"
        :style="{ '--rule-index': n }"
        v-show="n <= visibleRules">
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

<style src="./GamePlay.css" lang="css" scoped>
</style>
