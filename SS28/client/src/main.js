// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './stores/store'
const app = createApp(App)
app.use(store)
app.mount('#app')
