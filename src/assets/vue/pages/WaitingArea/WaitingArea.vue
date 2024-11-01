<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Loader from '../../components/Loader.vue'
import { useRouter } from 'vue-router'
import 'animate.css'
import Header from '@/assets/vue/components/Header/Header.vue'
import socket from '@/socket-io/socket'
import { getItem, removeItem, setItem } from '@/helpers/localstorage.helper'
import ForestToast from '@/assets/vue/components/ForestToast/ForestToast.vue'

const router = useRouter()
const isLoading = ref(false)
const code = ref('')
const isError = ref(false)
const errorMessage = ref('')
const isCard = ref(false)
const isButton = ref(true)
const isMovedUp = ref(false)
const errorToast = ref<InstanceType<typeof ForestToast> | null>(null)

const triggerToast = () => {
  if (errorToast.value) {
    errorToast.value.showToast()
  }
}

const goToGame = () => {
  console.log(code.value)
  if (!code.value) {
    errorMessage.value = 'Veuillez entrer un code valide'
    isError.value = true
    return
  }

  isLoading.value = true
  socket.emit('join game', code.value)

  const socketTimeout = setTimeout(() => {
    isLoading.value = false
    triggerToast()
  /*  if (errorToast.value) {
      errorToast.value.showToast()
    }*/
  }, 10000)

  socket.on('join room', room => {
    isLoading.value = false
    clearTimeout(socketTimeout)
    setItem('roomNumber', room)
    router.push('/game')
  })

  socket.on('full room', () => {
    console.log('full room')
    errorMessage.value = 'La room est pleine.'
    isError.value = true
    isLoading.value = false
    clearTimeout(socketTimeout);

  })

  socket.on('already in room', () => {
    console.log('already in room')
    errorMessage.value = 'Vous êtes déjà dans une room.'
    isError.value = true
    isLoading.value = false
    clearTimeout(socketTimeout);
  })

  socket.on('room does not exist', () => {
    console.log('room does not exist')
    errorMessage.value = "Cette room n'existe pas."
    isError.value = true
    isLoading.value = false
    clearTimeout(socketTimeout);
  })
}

const initValue = () => {
  errorMessage.value = ''
  code.value = ''
  isError.value = false
}

onMounted(() => {
  if (getItem('roomNumber')) {
    socket.emit('end game')
    removeItem('roomNumber')
  }

  setTimeout(() => {
    isMovedUp.value = true
    isCard.value = true
  }, 700)

  isCard.value = false
  isButton.value = true
})
</script>

<template>
  <Header></Header>
  <section id="waiting">
    <div v-if="isLoading" class="overlay"></div>
    <div class="title">
      <div class="forest-title">
        <h1 class="text-center font-bold">Forest Loop</h1>
      </div>
      <h2 class="text-2xl mt-4 text-white">Plongez dans l'aventure!</h2>
    </div>

    <div class="waitingCard animate__animated animate__fadeInUp">
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
          class="text-white font-bold py-2 px-4 rounded"
        >
          Valider
        </button>
      </div>
    </div>
    <Loader v-if="isLoading" />
    <ForestToast
      message="Connection échouée ..."
      class="mt-50"
      ref="errorToast"
    ></ForestToast>
  </section>
</template>

<style src="./WaitingArea.css" lang="css" scoped></style>
