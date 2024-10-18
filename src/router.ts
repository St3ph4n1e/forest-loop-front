import { createRouter, createWebHistory } from 'vue-router'
import Home from './assets/vue/pages/Home/Home.vue'
import WaitingArea from './assets/vue/pages/WaitingArea/WaitingArea.vue'
import GamePlay from './assets/vue/pages/GamePlay/GamePlay.vue'
import Rules from './assets/vue/pages/Rules/Rules.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/wait', component: WaitingArea },
  { path: '/game', component: GamePlay },
  { path: '/rules', component: Rules },
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
