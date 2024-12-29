import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import {
  faPowerOff,
  faCaretLeft,
  faDownload,
  faArrowRotateLeft,
  faCircleMinus,
  faTrash,
  faHouse
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import 'vue-toastification/dist/index.css'
import FloatingVue from 'floating-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'floating-vue/dist/style.css'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/main.css'

const app = createApp(App)
const pinia = createPinia()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 8000
    }
  }
})

library.add(faPowerOff, faCaretLeft, faDownload, faArrowRotateLeft, faSpotify, faCircleMinus, faTrash, faHouse)

const toastOptions = {}

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, { queryClient })
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Toast, toastOptions)
app.use(FloatingVue)

app.mount('#app')
