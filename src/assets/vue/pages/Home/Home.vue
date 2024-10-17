<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(true);

const goToWaitingArea = () => {
  router.push('/wait');
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 4500);
});
</script>

<template>
    <section class="home">
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
