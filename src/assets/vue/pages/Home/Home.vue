<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { fetchData } from '@/axios/api';
// import socket from '@/socket-io/socket'; 
// --> socketIO = commentaires *******

const router = useRouter();
const isLoading = ref(true); 
// const message = ref('');

const goToWaitingArea = () => {
  router.push('/wait'); 
};

// const getData = async () => {
//   try {
//     const data = await fetchData();
//     message.value = data.message; 
//   } catch (error) {
//     console.error('Error getting data:', error);
//   }
// };


//*********************** */
// const sendMessage = () => {
//   socket.emit('message', { content: 'Hello from Vue!' });
// };

onMounted(() => {

  // getData();


//********************* */
  // socket.on('message', (data) => {
  //   message.value = data.response; 
  // });

  setTimeout(() => {
    isLoading.value = false; 
  }, 3500); 
});
</script>

<template>
   <!-- <div>
        <h1>{{ message }}</h1>
      </div> -->
    <section class="home">
      <input  type="text">
      <div v-if="isLoading" class="overlay"></div> 
      <div class="content">
        <h1 class="text-6xl font-bold text-white">Forest Loop</h1>
        <h2 class="text-2xl mt-4 text-gray-300">Plongez dans l'aventure!</h2>
        <button @click="goToWaitingArea" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Commencer
        </button>
      </div>
    </section>
  </template>
  

<style src="./Home.css" lang="css" scoped></style>
