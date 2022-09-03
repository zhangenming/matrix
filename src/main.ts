import { createApp } from 'vue'
import App from './App.vue'
import test from './test.vue'

import './assets/main.css'

const app = createApp(test)
app.config.performance = true

app.mount('#app')
