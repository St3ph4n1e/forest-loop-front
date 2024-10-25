<script setup lang="ts">

import { gameRules } from '@/assets/vue/pages/Rules/rules.const'
import RuleCard from '@/assets/vue/components/RuleCard/RuleCard.vue'
</script>

<template>
  <div class="content-wrapper">
    <h2 class="title">VÉGÉTATIONS NORMALES</h2>
    <br>
    <img class="img-sprite" src="../../../images/RulesIcons/SimpleSprites.png"  />
    <h2 class="title">VÉGÉTATIONS MARQUÉS</h2>
    <br>
    <img class="img-sprite" src="../../../images/RulesIcons/MarkedSprites.png"  />
  </div>
</template>

<style src="./SpriteContent.css" scoped></style>
