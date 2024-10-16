<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loader from '../../components/Loader.vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false; 
  }, 2000);
});
</script>

<template>
  <div>
    <h1 >Page d'attente</h1>
    <p>Veuillez patienter...</p>
    <Loader  v-if="isLoading" />
  </div>
</template>


<style src="./WaitingArea.css" lang="css" scoped></style>