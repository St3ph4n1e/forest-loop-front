<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../../components/Header/Header.vue'

const router = useRouter()
const isLoading = ref(true)

const goToWaitingArea = () => {
  router.push('/wait')
}

onMounted(() => {
  // getData();

  //********************* */
  socket.on('test message', data => {
    console.log(data)

    message.value = data
  })

  socket.on('socket', data => {
    console.log('socket')
    message.value = 'sockets ' + ' ' + data
  })

  socket.on('events', data => {
    console.log('events', data)
    message.value = 'eventss ' + ' ' + data
  })

  socket.on('new room', rooms => {
    console.log('new room', rooms)
    message.value = 'rooms' + rooms
  })

  socket.on('join room', rooms => {
    console.log('join room', rooms)
    message.value = 'join rooms ' + rooms.toString()
  })

  socket.on('full room', () => {
    console.log('full room')
    message.value = 'full rooms '
  })

  socket.on('already in room', () => {
    console.log('already in room')
    message.value = 'already rooms '
  })

  socket.on('room does not exist', () => {
    console.log('room does not exist')
    message.value = 'not exist '
  })

  setTimeout(() => {
    isLoading.value = false
  }, 3500)
})
</script>

<template>
  <Header></Header>
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
    </div>
  </section>
</template>

<style src="./Home.css" lang="css" scoped></style>
