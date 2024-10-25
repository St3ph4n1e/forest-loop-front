<script setup lang="ts">
import Modal from '../../components/Modal/Modal.vue'
import Header from '../../components/Header/Header.vue'
import RuleCard from '../../components/RuleCard/RuleCard.vue'
import { ref } from 'vue'
import { gameRules } from './rules.const'
import SpriteContent from '@/assets/vue/components/SpriteContent/SpriteContent.vue'
import RuleContent from '@/assets/vue/components/RuleContent/RuleContent.vue'


const showModal = ref(false)
const selectedRule = ref({ titre: '', description: '', component: '' , image: '' })
const openModalWithRule = (rule: { titre: string; description: string; component: string; image: string; }) => {
  selectedRule.value = rule
  showModal.value = true
}

const handleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <Header></Header>
  <section class="rules p-10">
    <div v-if="!showModal" class="main-card animate__animated animate__fadeIn">
      <div class="title text-white">
        <h1 class="whitespace-nowrap">Guide forestier</h1>
      </div>
      <div class="cards grid grid-cols-1 md:grid-cols-2 gap-8 p-12" style="padding-bottom: 1rem;">
        <RuleCard
          v-for="(rule, index) in gameRules"
          :key="index"
          :picture="`RulesIcons/${rule.image}.png`"
          :title="rule.titre"
          @click="openModalWithRule(rule)"
        />
      </div>
      <h1 data-v-3d8c14db="" class="text-white text-lg mx-5" style="margin: 1rem;">Séléctionne une option</h1>
    </div>

    <Modal
      class="animate__animated animate__animated animate__fadeIn"
      :title="selectedRule.titre"
      :show-modal="showModal"
      @close="handleModal"
    >
      <div class="modal-content">
        <div class="scrollable-content">
          <template v-if="selectedRule.component == 'RuleContent'">
            <RuleContent />
          </template>
          <template v-if="selectedRule.component == 'SpriteContent'">
            <SpriteContent />
          </template>
        </div>
      </div>
    </Modal>
  </section>
</template>

<style src="./Rules.css" lang="css" scoped></style>
