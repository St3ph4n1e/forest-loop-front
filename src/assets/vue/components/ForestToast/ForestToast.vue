<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  message: {
    type: String,
    required: true,
  },
})

const isShow = ref(false)

const showToast = () => {
  isShow.value = true
  setTimeout(() => {
    isShow.value = false
  }, 5000)
}

defineExpose({ showToast })
</script>
<template>
  <section class="forest-toast">
    <div class="toast flex flex-col justify-center" :class="{ show: isShow }">
      <!-- <div class="img">Icon</div> -->
      <div class="text">{{ message }}</div>
    </div>
  </section>
</template>
<style src="./ForestToast.css" lang="css" scoped></style>
