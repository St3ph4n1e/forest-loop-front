<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import socket from '@/socket-io/socket'

const rules = ref([]);
const vege = ref(['buisson', 'arbre', 'champignon', 'roseau', 'rocher', 'bûche']);
const gridSize = { rows: 11, cols: 11 };
const centerX = Math.floor(gridSize.cols / 2);
const centerY = Math.floor(gridSize.rows / 2);
const gridCases = ref([]);
const redPointPosition = ref({ x: 0, y: 0 });
const monsterPosition = ref({ x: 6, y: 6 });



// Fonction pour vérifier les mots et injecter les images
function highlightVege(ruleText: string) {
  for (let plant of vege.value) {
    if (ruleText.includes(plant)) {
      const imageUrl = `src/assets/images/${plant}.png`;
      return `<img src="${imageUrl}" style="width: 60px" class="vege-image" alt="${plant}"> <p>${ruleText}</p>`;
    }
  }
  return ruleText;
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

  }

  //socket.on ('player death', (player) => {
    //if (player === 'red') {
      //redPointPosition.value = { x: 0, y: 0 }
    //}
  //});

onMounted(() => {
  const tempGridCases = [];
  for (let y = 0; y < gridSize.rows; y++) {
    for (let x = 0; x < gridSize.cols; x++) {
      let relX = x - centerX;
      let relY = centerY - y;
      tempGridCases.push({ id: `${relX}.${relY}`, x: relX, y: relY, visited: false });
    }
  }
  gridCases.value = tempGridCases;
});

  socket.on('player coords', ({ x, y }) => {
    redPointPosition.value = { x, y };
    const currentX = redPointPosition.value.x;
    const currentY = redPointPosition.value.y;

    // Trouver l'ancienne case
    const previousCase = gridCases.value.find(gridCase => gridCase.x === currentX && gridCase.y === currentY);

    // Marquer l'ancienne case comme visitée
    if (previousCase) {
      previousCase.visited = true;
    }

    // A CHANGER PAR LA MORT DU JOUEUR RECU PAR SOCKET IO
    // Si le point rouge passe par la case (0, 0), réinitialiser toutes les cases
    if (redPointPosition.value.x === 0 && redPointPosition.value.y === 0) {
      gridCases.value.forEach(gridCase => {
        gridCase.visited = false;
      });
    }
  });

  socket.on('monster coords', ({ x, y }) => {
    monsterPosition.value = { x, y };
    if (monsterPosition.value.x === 0 && monsterPosition.value.y === 0) {
      const monsterElement = document.querySelector('.monster');
      if (monsterElement) {
        monsterElement.style.opacity = '1';
        }
      }
  });

  socket.on('send rules', (newRules) => {
    rules.value = newRules;
  });

  onUnmounted(() => {
    socket.off('player coords');
  });


onUnmounted(() => {
  socket.off('player coords');
});

</script>

<template>
  <div class="container">
    <div class="left-pane">
      <div class="grid-map">
        <div
          v-for="gridCase in gridCases"
          :key="gridCase.id"
          :id="gridCase.id"
          class="grid-case"
          :class="{
                    'visited': gridCase.visited,
                    'monster': gridCase.x === monsterPosition.x && gridCase.y === monsterPosition.y,
                    'red-point': gridCase.x === redPointPosition.x && gridCase.y === redPointPosition.y} ">
        </div>
      </div>
    </div>

    <div class="right-pane">
      <h2 class="title">Règles</h2>
      <div
        class="card"
        v-for="(rule, index) in rules"
        :key="index"
        :style="{ '--rules-index': index + 1 }">
        <div class="face face1">
          <div class="gamer-font" v-html="highlightVege(rule)"></div>
        </div>
      </div>
      </div>
    </div>
</template>

<style src="./GamePlay.css" lang="css" scoped></style>
