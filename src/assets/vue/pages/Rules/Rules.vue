<script setup lang="ts">
</script>

<template>
  <section class="rules p-10">
    <div class="main-card">
      <div class="title text-white">
        <h1>Règles du jeu</h1>
      </div>
      <div class="cards grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
        <div class="card bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="../../../images/logo.svg" alt="Image 1" class="w-full h-40 object-cover">
          <div class="p-1">
            <h2 class="text-center text-white text-xs font-semibold px-2">Règles générales</h2>
          </div>
        </div>

        <div class="card bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="../../../images/logo.svg" alt="Image 2" class="w-full h-40 object-cover">
          <div class="p-1">
            <h2 class="text-center text-white text-xs font-semibold px-2">Carte</h2>
          </div>
        </div>

        <div class="card bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="../../../images/logo.svg" alt="Image 3" class="w-full h-40 object-cover">
          <div class="p-1">
            <h2 class="text-center text-white text-xs font-semibold px-2">Règles de zone</h2>
          </div>
        </div>
      </div>
      <h1 class="text-white text-lg">Séléctionne une option pour voir sa règle</h1>
    </div>
  </section>
</template>

<style src="./Rules.css" lang="css" scoped></style>
