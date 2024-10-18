<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchData } from '@/axios/api'
import socket from '@/socket-io/socket'
// --> socketIO = commentaires *******

const router = useRouter()
const isLoading = ref(true)
const message = ref('')
const party = ref('')

const goToWaitingArea = () => {
  router.push('/wait')
}

const getData = async () => {
  try {
    const data = await fetchData()
    message.value = data.message
  } catch (error) {
    console.error('Error getting data:', error)
  }
}

//*********************** */
const sendMessage = () => {
  socket.emit('test message', { content: 'Hello from Vue!' })
}

const joinGame = (party: string) => {
  socket.emit('join game', party)
}

const initGame = () => {
  socket.emit('init game')
}

onMounted(() => {
  // getData();

  //********************* */
  socket.on('test message', data => {
    console.log(data)

    message.value = data
  })

  socket.on('new room', rooms => {
    console.log('new room', rooms)
  })

  socket.on('join room', rooms => {
    console.log('join room', rooms)
  })

  socket.on('full room', () => {
    console.log('full room')
  })

  socket.on('already in room', () => {
    console.log('already in room')
  })

  socket.on('room does not exist', () => {
    console.log('room does not exist')
  })

  setTimeout(() => {
    isLoading.value = false
  }, 3500)
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-blue-500">{{ message }}</h1>
  </div>
  <section class="home">
    <div v-if="isLoading" class="overlay"></div>
    <div class="content">
      <h1 class="text-6xl font-bold text-white">Forest Loop</h1>
      <h2 class="text-2xl mt-4 text-gray-300">Plongez dans l'aventure!</h2>
      <button
        @click="goToWaitingArea"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Commencer
      </button>

      <input type="text" v-model="party" />
      <button
        @click="sendMessage"
        class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Socket
      </button>
      <button
        @click="joinGame(party)"
        class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Socket
      </button>
      <button
        @click="sendMessage"
        class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Socket
      </button>
    </div>
  </section>
</template>

<style src="./Home.css" lang="css" scoped></style>
