<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="container">
    <div class="left-pane">

    </div>
    <div class="right-pane">

    </div>
  </div>
</template>
<style src="./gameplay.css"  lang="css" scoped>
.container {
  display: flex;
  height: 100vh;
}

.left-pane, .right-pane {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  opacity: 0.9;
  backdrop-filter: blur(50px);
  height: 100%;
  margin: 10px;
}

.left-pane {
  flex: 2;
  background-color: rgba(255, 255, 255, 0.3);
}

.right-pane {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
