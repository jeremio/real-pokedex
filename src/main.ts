import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import '@fontsource/montserrat/100.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import './assets/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
