import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import doUI from '../packages'

createApp(App).use(doUI).mount('#app')
