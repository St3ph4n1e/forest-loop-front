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
  <div class="flex flex-col card bg-white rounded-lg shadow-lg overflow-hidden">
    <img :src="getUrl(picture)" class="w-full h-40 object-cover" />
    <div class="p-1">
      <p class="text-center text-white text-xs font-semibold px-2">
        {{ title }}
      </p>
    </div>
  </div>
</template>
<style src="./RuleCard.css" lang="css" scoped></style>
