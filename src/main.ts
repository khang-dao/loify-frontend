import './assets/main.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPowerOff, faCaretLeft, faPlus, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';


const app = createApp(App)
const pinia = createPinia()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Avoid refetching when window regains focus
      retry: 2,
      retryDelay: 8000,
    },
  },
});

library.add(faPowerOff, faCaretLeft, faPlus, faArrowRotateLeft, faSpotify)

const toastOptions = {}

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, { queryClient })
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Toast, toastOptions);


app.mount('#app')
