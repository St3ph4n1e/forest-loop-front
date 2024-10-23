<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import socket from '@/socket-io/socket'

const router = useRouter()

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
  router.push('/')
}
</script>

<template>
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
      </ul>
    </nav>
  </header>
</template>

<style src="./Header.css" scoped></style>
