<script setup lang="ts">

import router from '@/router'

const goToWaitingRoom = () => {
  router.push('/wait')
}

</script>

<template>
<div class="continer-win">
  <h3 class="title">
    Bien joué, guide avisé ! 🌿 Grâce à toi, la sortie est trouvée et la boucle est rompue !
  </h3>
  <button @click="goToWaitingRoom">
    Retour en salle d'attente
  </button>
</div>
</template>

<style scoped lang="css">

</style>
