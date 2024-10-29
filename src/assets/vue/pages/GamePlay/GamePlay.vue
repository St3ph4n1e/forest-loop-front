<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import socket from '@/socket-io/socket'
import Header from '../../components/Header/Header.vue'
import type { GridCase } from '../../types/gridCase'
import Modal from '@/assets/vue/components/Modal/Modal.vue'
import WinGameContent from '@/assets/vue/components/WinGameContent/WinGameContent.vue'
import { getItem, removeItem } from '@/helpers/localstorage.helper'
import router from '@/router'
import ForestToast from '@/assets/vue/components/ForestToast/ForestToast.vue'

const rules = ref([])
const vege = ref([
  'buisson',
  'arbre',
  'champignon',
  'roseau',
  'rocher',
  'bûche',
])
const gridSize = { rows: 11, cols: 11 }
const centerX = Math.floor(gridSize.cols / 2)
const centerY = Math.floor(gridSize.rows / 2)
const gridCases = ref<GridCase[]>([])
const playerPosition = ref({ x: 0, y: 0 })
const monsterPosition = ref({ x: 0, y: 0 })
const isModalOpen = ref(false);
const isMonsterInvisible = ref(false)
const showWinGameModal = ref(false)
const errorToast = ref<InstanceType<typeof ForestToast> | null>(null)
const hasShownErrorToast = ref(false)

// Fonction pour vérifier les mots et injecter les images
function highlightVege(ruleText: string) {
  for (let plant of vege.value) {
    if (ruleText.includes(plant)) {
      const imageUrl = `src/assets/images/${plant}.png`
      return `<img src="${imageUrl}" alt="${plant}" style="flex-basis: 10%"> <p style="font-size: 0.8rem; flex-basis: 60%;">${ruleText}</p>`
    }
  }
  return ruleText
}

watch(
  monsterPosition,
  newPosition => {
    if (newPosition.x === 0 && newPosition.y === 0) {
      isMonsterInvisible.value = true
    } else {
      isMonsterInvisible.value = false
    }
  },
  { immediate: true },
)
const handleRedirection = (target: string) => {
  const roomNumber = getItem('roomNumber');
  if (roomNumber || target === '/') {
    router.push(target);
  }
}

const triggerToast = () => {
  if (errorToast.value && !hasShownErrorToast.value) {
    errorToast.value.showToast()
    hasShownErrorToast.value = true
  }
}

onMounted(() => {
  const roomNumber = getItem('roomNumber')

  window.addEventListener('beforeunload', function () {
    console.log("on beforeunload")
    removeItem('roomNumber')
  });

  if (!roomNumber) {
    console.log("no room number in local storage")
    handleRedirection('/')
    return
  }

  const tempGridCases = []
  for (let y = 0; y < gridSize.rows; y++) {
    for (let x = 0; x < gridSize.cols; x++) {
      let relX = x - centerX
      let relY = centerY - y
      tempGridCases.push({
        id: `${relX}.${relY}`,
        x: relX,
        y: relY,
        visited: false,
      })
    }
  }
  gridCases.value = tempGridCases
})

socket.on('player coords', ({ x, y }) => {
  playerPosition.value = { x, y }
  const currentX = playerPosition.value.x
  const currentY = playerPosition.value.y

  // Trouver la case actuelle
  const previousCase = gridCases.value.find(
    gridCase => gridCase.x === currentX && gridCase.y === currentY,
  )

  // Marquer la case comme visitée si son id n'est pas "0.0"
  if (previousCase && previousCase.id !== '0.0') {
    previousCase.visited = true
  }
})

socket.on('monster coords', ({ x, y }) => {
  monsterPosition.value = { x, y }
})

socket.on('send rules', newRules => {
  rules.value = newRules
  const audio = new Audio('src/assets/images/notebook.wav')
  audio.play()

})

socket.on("connect_error", (err) => {
  triggerToast()
  setTimeout(() => {
    handleRedirection("/")
  }, 10000)
});

socket.on ('player death', () => {
  playerPosition.value = { x: 0, y: 0 }
  gridCases.value.forEach(gridCase => {
    gridCase.visited = false
  })
})

socket.on("game won", () => {
  console.log("game won")
  showWinGameModal.value = true
  console.log(showWinGameModal.value)
  removeItem("roomNumber")
})

socket.on('end game', () => {
  console.log("end game called")
  removeItem('roomNumber')
  handleRedirection('/wait')
})

const toggleModal = (isOpen: boolean) => {
  isModalOpen.value = isOpen
}

onUnmounted(() => {
  socket.off('player coords')
  socket.off('send rules')
  socket.off('monster coords')
  socket.off('player death')
})
</script>

<template>
  <Header @modal-toggle="toggleModal"></Header>
  <div v-show="!isModalOpen" class="game-container">
    <div class="left-pane">
      <div class="grid-map">
        <div
          v-for="gridCase in gridCases"
          :key="gridCase.id"
          :id="gridCase.id"
          class="grid-case"
          :class="{
            'map-center': gridCase.id === '0.0',
            'red-point':
              gridCase.x === playerPosition.x &&
              gridCase.y === playerPosition.y,
            visited: gridCase.visited,
            monster:
              gridCase.x === monsterPosition.x &&
              gridCase.y === monsterPosition.y &&
              !(monsterPosition.x === 0 && monsterPosition.y === 0),
          }"
        ></div>
      </div>
    </div>

    <div class="right-pane">
      <h2 class="title">Règles</h2>
      <div
        class="rule-card"
        v-for="(rule, index) in rules"
        :key="index"
        :style="{ '--rules-index': index + 1 }"
      >
        <div class="gamer-font" v-html="highlightVege(rule)"></div>
      </div>
    </div>
  </div>
  <Modal :title="'Victoire'" :show-modal="showWinGameModal" :closable="false">
    <div class="modal-content">
      <div class="wingame-container">
        <WinGameContent />
      </div>
    </div>
  </Modal>
  <ForestToast
    message="Connection échouée ..."
    class="mt-50"
    ref="errorToast"
  ></ForestToast>
</template>

<style src="./GamePlay.css" lang="css" scoped></style>
