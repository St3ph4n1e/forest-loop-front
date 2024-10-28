<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import socket from '@/socket-io/socket'
import Modal from '../Modal/Modal.vue'
import SpriteContent from '@/assets/vue/components/SpriteContent/SpriteContent.vue'

const emit = defineEmits(['modal-toggle'])

const router = useRouter()
const showModalSprites = ref(false)
const showModalQuit = ref(false)

const goHome = () => {
  router.push('/')
}

const goToRules = () => {
  router.push('/rules')
}

const currentRoute = computed(() => router.currentRoute.value.path)

const isActive = (routePath: string) => {
  return currentRoute.value === routePath ? 'active' : ''
}

const endGame = () => {
  handleModalQuit()
  socket.emit('end game')
  router.push('/')
}

const handleModalSprites = () => {
  showModalSprites.value = !showModalSprites.value
  emit('modal-toggle', showModalSprites.value)
}

watch(showModalSprites, newValue => {
  emit('modal-toggle', newValue)
})

const handleModalQuit = () => {
  showModalQuit.value = !showModalQuit.value
  emit('modal-toggle', showModalQuit.value)
}

watch(showModalQuit, newValue => {
  emit('modal-toggle', newValue)
})


onMounted(() => {
  socket.on('end game', () => {
    router.push('/')
  })
})
</script>

<template>
  <section class="forest-header">
    <header class="navbar">
      <div v-if="currentRoute !== '/game'" class="logo" @click="goHome">
        <img src="../../../images/logo.png" alt="Logo" />
      </div>
      <div v-else class="game-logo logo" @click="handleModalQuit">
        <img src="../../../images/back.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li
            class="animate__animated animate__fadeInDown"
            v-if="currentRoute !== '/' && currentRoute !== '/game'"
            :class="isActive('Home')"
            @click="goHome"
          >
            Accueil
          </li>
          <li
            class="sm:w-15 animate__animated animate__fadeInDown"
            v-if="currentRoute !== '/rules' && currentRoute !== '/game'"
            :class="isActive('Rules')"
            @click="goToRules"
          >
            Forest Guide
          </li>
          <li
            class="sm:w-15 animate__animated animate__fadeInDown"
            v-if="currentRoute === '/game'"
            :class="isActive('Game')"
            @click="handleModalSprites"
          >
            <img
              class="header-sprite"
              src="../../../images/RulesIcons/Mushroom.png"
              alt="sprite"
            />
          </li>
        </ul>
      </nav>
    </header>
    <Modal :title="'Végétations'" :show-modal="showModalSprites" @close="handleModalSprites">
      <div class="modal-content">
        <div class="scrollable-content">
          <SpriteContent />
        </div>
      </div>
    </Modal>
    <Modal :title="''" :show-modal="showModalQuit" @close="handleModalQuit">
      <div class="modal-content">
        <div class="scrollable-content pt-20">
          <div>
            <h2 class="text-center">Voulez vous vraiment quitter la partie ? </h2>
          </div>
          <div class="text-center">
            <button class="btn btn-red" @click="handleModalQuit">Non</button>
            <button class="btn" @click="endGame">Oui</button>
          </div>
        </div>
      </div>
    </Modal>

  </section>
</template>

<style src="./Header.css" scoped></style>
