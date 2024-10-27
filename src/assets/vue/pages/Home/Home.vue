<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import 'animate.css'
import Header from '../../components/Header/Header.vue'

const router = useRouter()
const isLoading = ref(true)
const isMovedUp = ref(false)
const isButtonAnimating = ref(false)

const goToWaitingArea = () => {
  isButtonAnimating.value = true;
  isMovedUp.value = true;
  setTimeout(() => {
    router.push('/wait')
  }, 700)
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2500)
})
</script>


<template>
  <Header v-if="!isLoading"></Header>
  <section class="home">
    <div v-if="isLoading" class="overlay"></div>
    <div :class="['title', { 'move-up': isMovedUp }]">
      <div class="forest-title">
        <h1 class="text-center font-bold">Forest Loop</h1>
      </div>
      <h2 class="text-2xl mt-4 text-white">Plongez dans l'aventure!</h2>
      <button
        @click="goToWaitingArea"
        :class="['bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded', { 'animate__animated animate__bounceOut': isButtonAnimating }]"
      >
        Commencer
      </button>
    </div>
  </section>
</template>



<style src="./Home.css" lang="css" scoped></style>
