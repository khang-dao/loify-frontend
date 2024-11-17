<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { user, logout } = useUserStore()
user.isLoggedIn && logout()
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="heading-container">
        <h1 class="heading">You have successfully logged out.</h1>
        <h1 class="sub-heading">Thanks for using loify!</h1>
      </div>
      <div class="button-container">
        <RouterLink class="button" to="/login">click to log back in </RouterLink>
        <RouterLink class="button" to="/">click to go home</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: 'League Spartan', sans-serif;
  margin: 10rem;
  text-align: center;
  color: #000000;
}

.heading-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #000000;
}

.heading {
  font-size: 1.5rem;
}

.sub-heading {
  font-size: 1.25rem;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #000000;
}

.button {
  text-decoration: none;
  font-size: 1rem;
  color: #000000;
  cursor: pointer;
}
</style>
