<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import socket from '@/socket-io/socket'

const router = useRouter()
// const showModal = ref(false)

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
            @click="showModal"
          >
            <img
              class="header-sprite"
              src="../../../images/sprite.png"
              alt="sprite"
            />
          </li>
        </ul>
      </nav>
    </header>
  </section>
</template>

<style src="./Header.css" scoped></style>
