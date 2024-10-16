import './assets/css/main.css'
import { createApp } from 'vue';
import App from './assets/vue/App.vue';
import router from './router'; 

createApp(App)
  .use(router)
  .mount('#app');

