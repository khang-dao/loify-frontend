import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref(useLocalStorage('currentUser', { isLoggedIn: false }))

  async function updateAuthStatus() {
    const response = await axios.get('http://localhost:8080/api/v1/auth/session/check')
    if (response.status === 200) {
      user.value.isLoggedIn = true
    }
    return user.value.isLoggedIn
  }

  async function logout() {
    try {
      await axios.get('http://localhost:8080/api/v1/auth/session/logout', { withCredentials: true })
      window.open("https://accounts.spotify.com/logout", "_blank", "noopener,noreferrer");
      user.value.isLoggedIn = false
    }
    catch (error){
      console.log(`Error logging out: ${error}`)
    }
  }

  return {
    user,
    updateAuthStatus,
    logout,
  }
})
