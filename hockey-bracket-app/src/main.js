import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.css'
import { useParticipantStore } from '@/store/participantStore';
import { watch } from 'vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

 
  