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
  <section class="fl-modal" v-if="showModal">
    <div class="modal-body flex flex-col justify-between">
      <div class="modal-header text-center">
        <h2>{{ title }}</h2>
        <span @click="closeModal" class="close-btn">&times;</span>
      </div>
      <hr />
      <div class="modal-content">
        <p>{{ description }}</p>
      </div>
      <hr />
      <footer class="modal-footer">
        <button @click="closeModal">C'est Compris</button>
      </footer>
    </div>
  </section>
</template>

<style src="./Modal.css" lang="css" scoped></style>
