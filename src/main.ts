import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './router'

// console.log('from main.ts', Notification)

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

app.use(createPinia())
app.use(router)

app.mount('#app')
