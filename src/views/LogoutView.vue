<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { user, updateAuthStatus, logout } = useUserStore()
user.isLoggedIn && logout().then(() => updateAuthStatus())



/* TODO: Add logic here to visit:
    ** Think about whether this should be done on the `@click, <Button>` OR <LogoutView>

    1. `window.href = 'https://accounts.spotify/logout'                ... "_blank" `
    2. also to send a GET/POST Request to 'http://localhost:8080/api/logout'
    3. await until [Step #1] done...
        4. have a skeleton loading until it confirms
    5. then show /logout route (`LogoutView`)
*/



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
  background: #232323;
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
}

.heading-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #ffffff;
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
  color: #ffffff;
}

.button {
  text-decoration: none;
  font-size: 1rem;
  color: #6a6a6a;
  cursor: pointer;
}
</style>
