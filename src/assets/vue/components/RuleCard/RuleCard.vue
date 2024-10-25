<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

function getUrl(file: string): string {
  return new URL(`/src/assets/images/${file}`, import.meta.url).href
}
</script>
<template>
  <section class="rule-card">
    <div class="flex flex-col card bg-white rounded-lg shadow-lg overflow-hidden p-5 h-40">
      <div class="flex flex-col items-center justify-center">
        <img :src="getUrl(picture)" class="custom-image mx-auto" />

        <div class="p-1">
          <p class="text-center text-white text-xs font-semibold px-2">
            {{ title }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style src="./RuleCard.css" lang="css" scoped></style>
