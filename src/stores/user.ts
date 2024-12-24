import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import client from '@/api/client'

export const useUserStore = defineStore('user', () => {
  const user = ref(useLocalStorage('currentUser', { isLoggedIn: false }))

  async function updateAuthStatus(): Promise<boolean> {
    try {
      const response = await client.get('/auth/session/check')
      if (response.status === 200) {
        user.value.isLoggedIn = true
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    }
    return user.value.isLoggedIn
  }

  async function logout() {
    try {
      await client.post('/auth/session/logout')
      const logoutWindow = window.open('https://accounts.spotify.com/logout', '_blank', 'noopener,noreferrer')
      if (logoutWindow) {
        logoutWindow.focus()
      }

      user.value.isLoggedIn = false
    } catch (error) {
      console.error(`Error logging out: ${error}`)
    }
  }

  return {
    user,
    updateAuthStatus,
    logout
  }
})
