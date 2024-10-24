<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import socket from '@/socket-io/socket'
import Modal from '../Modal/Modal.vue'
import RuleCard from '../RuleCard/RuleCard.vue'
import SpriteContent from '@/assets/vue/components/SpriteContent/SpriteContent.vue'

const emit = defineEmits(['modal-toggle'])

const router = useRouter()
const showModal = ref(false)

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
  socket.emit('end game')
}

const handleModal = () => {
  showModal.value = !showModal.value
  emit('modal-toggle', showModal.value)
}

watch(showModal, newValue => {
  emit('modal-toggle', newValue)
})

onMounted(() => {
  socket.on('end game', () => {
    router.push('/')
  })
})
</script>

<template>
  <section :class="{ 'header-game': currentRoute === '/game' }">
    <header class="navbar">
      <div v-if="currentRoute !== '/game'" class="logo" @click="goHome">
        <img src="../../../images/logo.png" alt="Logo" />
      </div>
      <div v-else class="logo" @click="endGame">
        <img src="../../../images/logout.png" alt="Logo" />
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
            @click="handleModal"
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
    <Modal
      :title="'Végétations'"
      :show-modal="showModal"
      @close="handleModal"
    >
      <div class="modal-content ">
        <div class="scrollable-content">
          <SpriteContent />
        </div>
      </div>
    </Modal>
  </section>
</template>

<style src="./Header.css" scoped></style>
