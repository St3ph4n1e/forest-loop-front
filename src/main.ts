import './assets/css/main.css'
import router from './router'

import { createApp } from 'vue'
import App from './assets/vue/App.vue'

createApp(App)
  .use(router)
  .mount('#app')
