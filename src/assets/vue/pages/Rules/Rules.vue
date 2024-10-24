<script setup lang="ts">
import Modal from '../../components/Modal/Modal.vue'
import Header from '../../components/Header/Header.vue'
import RuleCard from '../../components/RuleCard/RuleCard.vue'
import { ref } from 'vue'
import { gameRules } from './rules.const'
//import SpriteContent from '@/assets/vue/components/SpriteContent/SpriteContent.vue'
//import RuleContent from '@/assets/vue/components/RuleContent/RuleContent.vue'


const showModal = ref(false)
const selectedRule = ref({ titre: '', description: '' })
const openModalWithRule = (rule: { titre: string; description: string }) => {
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
      <div class="cards grid grid-cols-1 md:grid-cols-2 gap-8 p-12">
        <RuleCard
          v-for="(rule, index) in gameRules"
          :key="index"
          picture="RulesIcons/Mushroom.png"
          :title="rule.titre"
          @click="openModalWithRule(rule)"
        />
      </div>
      <h1 class="text-white text-lg">Séléctionne une option</h1>
    </div>
    <Modal
      class="animate__animated animate__animated animate__fadeIn"
      :title="selectedRule.titre"
      :show-modal="showModal"
      @close="handleModal"
    > <template v-if="selectedRule.description">
      {{ selectedRule.description}}
    </template>
      <template v-else>
        <RuleCard title="gshsshf" picture="logo.png"></RuleCard>
      </template>
    </Modal>
  </section>
</template>

<style src="./Rules.css" lang="css" scoped></style>
