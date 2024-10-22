<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goToRules = () => {
  router.push('/rules')
}

/*
  const goToWait = () => {
  router.push('/wait')
}*/

const currentRoute = computed(() => router.currentRoute.value.path)

const isActive = (routePath: string) => {
  return currentRoute.value === routePath ? 'active' : ''
}
</script>

<template>
  <header class="navbar">
    <div class="logo" @click="goHome">
      <img src="../../../images/logo.svg" alt="Logo" />
    </div>
    <nav>
      <ul>
        <li class="animate__animated animate__fadeInDown"
          v-if="currentRoute !== '/'"
          :class="isActive('Home')"
          @click="goHome"
        >
          Accueil
        </li>
        <li class="animate__animated animate__fadeInDown"
          v-if="currentRoute === '/' || currentRoute === '/wait' "
          :class="isActive('Rules')"
          @click="goToRules"
        >
          Règles du jeu
        </li>
        <!--<li class="animate__animated animate__fadeInDown"
            v-if="currentRoute === '/rules' "
            :class="isActive('WaitingArea')"
            @click="goToWait"
        >
          Salle d'attente
        </li>-->
      </ul>
    </nav>
  </header>
</template>

<style src="./Header.css" scoped></style>
