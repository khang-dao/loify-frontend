import { createRouter, createWebHistory } from 'vue-router'

import config from '@/config'
import { useUserStore } from '@/stores/user'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import LoifyView from '@/views/LoifyView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()
        userStore.user.isLoggedIn ? next({ name: 'loify' }) : next()
      }
    },
    {
      path: '/loify',
      name: 'loify',
      component: LoifyView,
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore()
        try {
          if (!userStore.user.isLoggedIn) {
            !(await userStore.updateAuthStatus()) && next({ name: 'login' })
          }
        } catch {
          next({ name: 'login' })
        }
        next()
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
      // TODO: Implement this --> beforeEnter: (to, from, next) => {}
    }
  ]
})

export default router
