<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchData } from '@/axios/api'
import socket from '@/socket-io/socket'
// --> socketIO = commentaires *******

const router = useRouter()
const isLoading = ref(true)
const message = ref('messaaaaaaage')
const message2 = ref('deuuuuuux')
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
  // socket.emit('test message', { content: 'Hello from Vue!' })
  // socket.emit('socket')
  const coords = new Map();
  coords.set("x", 100);
  coords.set("y", 20);

  socket.emit('playerCoords', coords)
}

const endGame = () => {
  socket.emit('end game')
}
const joinGame = (party: string) => {
  console.log('we are here')

  const type = typeof party

  if (!party) {
    message.value = 'entrer un numéro de Room'
  }
  console.log(party)
  message2.value = party + ' ' + type

  socket.emit('join game', party)
}

const initGame = () => {
  socket.emit('init game')
  console.log('init')

  message.value = 'init'
}

const sendEvent = () => {
  socket.emit('events', 'bonjour tout le monde')
  console.log('events')

  message.value = 'events'
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

  socket.on('playerCoords', (data) => {
    console.log('player coords:', data)
    message.value = 'player coords: ' +data
  })

  socket.on('monsterCoords', (data) => {
    console.log('monster coords:', data)
    message.value = 'monster coords: ' +data
  })

  socket.on('playerDeath', (data) => {
    console.log('player death:', data)
    message.value = 'player death: ' + data
  })


  setTimeout(() => {
    isLoading.value = false
  }, 3500)
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-blue-500">{{ message }}</h1>
    <h6 class="text-3xl font-bold text-yellow-500">{{ message2 }}</h6>
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
        Player coords
      </button>
      <button
        @click="joinGame(party)"
        class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Socket Join
      </button>
      <button
        @click="initGame"
        class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Socket Init
      </button>

      <button
        @click="sendEvent"
        class="bg-yellow-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Socket events
      </button>
      <button @click="endGame">
        End Game
      </button>
    </div>
  </section>
</template>

<style src="./Home.css" lang="css" scoped></style>
