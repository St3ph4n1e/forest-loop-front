<script setup lang="ts">
import { ref } from 'vue'
import Loader from '../../components/Loader.vue'
import { useRouter } from 'vue-router'
import 'animate.css'

const router = useRouter()
const isLoading = ref(false)
const code = ref('')
const isError = ref(false)

const goToGame = () => {
  if (code.value === '12345') {
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
      router.push('/game')
    }, 2000)
  }
  if (code.value !== '12345') {
    isError.value = true
  }
}
</script>

<template>
  <section class="waiting">
    <div v-if="isLoading" class="overlay"></div>
    <div class="title">
      <h1 class="text-6xl font-bold text-white">Forest Loop</h1>
      <h2 class="text-2xl mt-4 text-gray-300">Plongez dans l'aventure!</h2>
    </div>
    <button
      class="animate__animated animate__fadeOut bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Commencer
    </button>
    <!-- Waiting room card -->
    <div class="waitingCard animate__animated animate__fadeIn">
      <!-- <div class="waitingCard"> -->
      <div class="px-6 py-4">
        <div class="font-bold text-l text-white">Code de la partie</div>
        <label for="gamecode"></label>
        <input
          v-model="code"
          type="text"
          id="gamecode"
          class="bg-gray-50 py-4 px-10 my-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
          maxlength="5"
          placeholder="Entrez un code"
          required
        />
        <div v-if="isError" class="errorMessage font-bold text-xs text-red-500">
          Veuillez réessayer avec un code valide
        </div>
        <button
          @click="goToGame"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Valider
        </button>
      </div>
    </div>
    <Loader v-if="isLoading" />
  </section>
</template>

<style src="./WaitingArea.css" lang="css" scoped></style>
