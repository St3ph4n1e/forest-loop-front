<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../../components/Header/Header.vue'
import ForestToast from '../../components/ForestToast/ForestToast.vue'

const router = useRouter()
const isLoading = ref(true)
const toast = ref<InstanceType<typeof ForestToast> | null>(null)

const goToWaitingArea = () => {
  router.push('/wait')
}

const triggerToast = () => {
  if (toast.value) {
    toast.value.showToast()
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2500)
})
</script>

<template>
  <Header v-if="!isLoading"></Header>

  <section class="home">
    <div v-if="isLoading" class="overlay"></div>
    <div class="content">
      <div class="title">
        <h1 class="text-center font-bold">Forest Loop</h1>
      </div>
      <h2 class="text-2xl mt-4 text-white">Plongez dans l'aventure!</h2>
      <button
        @click="goToWaitingArea"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Commencer
      </button>
    </div>

    <ForestToast
      message="Welcome in the forest"
      class="mt-50"
      ref="toast"
    ></ForestToast>
  </section>
</template>

<style src="./Home.css" lang="css" scoped></style>
