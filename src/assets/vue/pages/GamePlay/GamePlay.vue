<script setup lang="ts">
import { ref } from 'vue';

const visibleRules = ref(0);

const showNextRule = () => {
  if (visibleRules.value < 5) {
    visibleRules.value += 1;
  }
};
</script>

<template>
  <div class="container" @click="showNextRule">
    <div class="left-pane">
      <div class="grid-map"></div>
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
            <p class="gamer-font">Si il y a  un gros caillou rouge à gauche de l'écran, aller à droite et ne pas aller à gauche.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./GamePlay.css" lang="css" scoped>
</style>
