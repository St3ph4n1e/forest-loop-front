<script setup lang="ts">

import router from '@/router'

const goToWaitingRoom = () => {
  router.push('/wait')
}

</script>

<template>
<div class="container-win">
  <h3 class="title-win">
    Bien joué, guide avisé ! 🌿 Grâce à toi, la sortie est trouvée et la boucle est rompue !
  </h3>
  <button class="btn" @click="goToWaitingRoom">
    Retour en salle d'attente
  </button>
</div>
</template>

<style src="./WinGameContent.css" scoped lang="css">

</style>
