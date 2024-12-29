<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router'

import { useUserStore } from '@/stores/user'

const { user, logout } = useUserStore()
if (user.isLoggedIn) {
  logout()
  console.log('User logged out.')
}
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
      </div>
    </div>
    <RouterLink to="/">
      <FontAwesomeIcon :icon="['fas', 'house']" class="icon house" />
    </RouterLink>
  </main>
</template>

<style scoped>
.main {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: var(--font-family-secondary);
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
  color: #171717;
  cursor: pointer;
}

.icon {
  color: #54198a;
  cursor: pointer;
}

.icon.house {
  font-size: 1.25rem;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}

@media (max-width: 1200px) {
  .container {
    margin: 2rem;
    gap: 1rem;
  }
}
</style>
