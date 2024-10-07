import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LoifyView from '@/views/LoifyView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        } catch (error) {
          next({ name: 'login' })
        }
        next()
      },
      meta: { requiresAuth: true }
    }
  ]
})

export default router
