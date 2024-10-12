import './assets/main.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

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

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, { queryClient })


app.mount('#app')
