<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loader from '../../components/Loader.vue';

const isLoading = ref(true);
const code = ref('');

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<template>
  <section class="waiting">
    <!-- Page title -->
    <div class="title">
      <h1 class="text-6xl font-bold text-white">Forest Loop</h1>
      <h2 class="text-2xl mt-4 text-gray-300 pb-8">Plongez dans l'aventure!</h2>
    </div>
      <!-- Waiting room card -->
      <div class="waitingCard">
        <div class="px-6 py-4">
          <div class="font-bold text-xl text-white ">Code de partie</div>
          <label for="gamecode"></label>
          <input v-model="code" type="text" id="gamecode" class="bg-gray-50 py-4 px-10 my-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" maxlength="5" placeholder="Entrez un code" required />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Valider
          </button>
        </div>
      </div>
      <Loader  v-if="isLoading" />

  </section>
</template>


<style src="./WaitingArea.css" lang="css" scoped></style>
