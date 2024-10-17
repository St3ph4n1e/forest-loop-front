<script setup lang="ts">
const emit = defineEmits(['close'])
defineProps({
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  showModal: {
    type: Boolean,
    default: false,
  },
})

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <section
    class="fl-modal"
    :class="{ 'fade-in': showModal, 'fade-out': !showModal }"
    v-if="showModal"
  >
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-body flex flex-col justify-between">
      <div class="modal-header text-center">
        <h2>{{ title }}</h2>
        <span @click="closeModal" class="close-btn">&times;</span>
      </div>
      <div class="modal-content">
        <p>{{ description }}</p>
      </div>
      <footer class="modal-footer">
        <button class="btn" @click="closeModal">C'est Compris</button>
      </footer>
    </div>
  </section>
</template>

<style src="./Modal.css" lang="css" scoped></style>
