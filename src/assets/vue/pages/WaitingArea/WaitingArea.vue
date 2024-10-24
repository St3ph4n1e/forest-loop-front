<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Loader from '../../components/Loader.vue'
import { useRouter } from 'vue-router'
import 'animate.css'
import Header from '@/assets/vue/components/Header/Header.vue'
import socket from '@/socket-io/socket'

const router = useRouter()
const isLoading = ref(false)
const code = ref('')
const isError = ref(false)
const errorMessage = ref('')
const isCard = ref(false)
const isButton = ref(true)
const isMovedUp = ref(false)

const goToGame = () => {
  console.log(code.value)
  if (!code.value) {
    errorMessage.value = 'Veuillez entrer un code valide'
    isError.value = true
    return
  }

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    socket.emit('join game', code.value)
  }, 1500)
}

const initValue = () => {
  errorMessage.value = ''
  code.value = ''
  isError.value = false
}

const initGame = () => {
  socket.emit('init game')
  console.log('init')
}

onMounted(() => {
  setTimeout(() => {
    isMovedUp.value = true
    isCard.value = true
  }, 700)

  isCard.value = false
  isButton.value = true

  socket.on('full room', () => {
    console.log('full room')
    errorMessage.value = 'La room est pleine.'
    isError.value = true
    isLoading.value = false
  })

  socket.on('already in room', () => {
    console.log('already in room')
    errorMessage.value = 'Vous êtes déjà dans une room.'
    isError.value = true
    isLoading.value = false
  })

  socket.on('room does not exist', () => {
    console.log('room does not exist')
    errorMessage.value = 'Cette room n\'existe pas.'
    isError.value = true
    isLoading.value = false
  })

  socket.on('join room', (room) => {
    console.log('join room', room)
    isLoading.value = false
    router.push('/game')
  })
})
</script>


<template>
  <Header></Header>
  <section id="waiting">
    <div v-if="isLoading" class="overlay"></div>
    <div :class="['title', { 'move-up': isMovedUp }]">
      <h1 class="text-6xl font-bold text-white">Forest Loop</h1>
      <h2 class="text-2xl mt-4 text-gray-300">Plongez dans l'aventure!</h2>
      <button
        v-if="isButton"
        class="animate__animated animate__bounceOut bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Commencer
      </button>
    </div>

    <div
      v-if="isCard"
      class="waitingCard animate__animated animate__fadeInUpBig"
    >
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
          {{ errorMessage }}
        </div>
        <button
          @click="goToGame()"
          @blur="initValue"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Valider
        </button>

        <button
          @click="initGame()"
          class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Init
        </button>
      </div>
    </div>
    <Loader v-if="isLoading" />
  </section>
</template>

<style src="./WaitingArea.css" lang="css" scoped></style>
