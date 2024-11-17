import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import client from '@/api/client'

export const useUserStore = defineStore('user', () => {
  const user = ref(useLocalStorage('currentUser', { isLoggedIn: false }))

  async function updateAuthStatus() {
    const response = await client.get('/auth/session/check')
    if (response.status === 200) {
      user.value.isLoggedIn = true
    }
    return user.value.isLoggedIn
  }

  async function logout() {
    try {
      await client.get('/auth/session/logout')
      window.open('https://accounts.spotify.com/logout', '_blank', 'noopener,noreferrer')
      user.value.isLoggedIn = false
    } catch (error) {
      console.log(`Error logging out: ${error}`)
    }
  }

  return {
    user,
    updateAuthStatus,
    logout
  }
})
