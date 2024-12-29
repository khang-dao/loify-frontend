<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <img src="" />
    <div class="container">
      <h1 class="heading">Welcome to</h1>
      <h1 class="logo">Loify</h1>
      <RouterLink class="subheading" to="/login">click to begin</RouterLink>
    </div>
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
  gap: 1rem;
  font-family: var(--font-family-secondary);

  img {
    width: 13rem;
    height: auto;
  }
}

.heading {
  color: #000000;
  font-size: 2rem;
  font-family: var(--font-family-primary);
  font-weight: 100;
}

.logo {
  color: #000000;
  font-size: 7rem;
  font-family: var(--font-family-primary);
  font-weight: 100;
}

.subheading {
  color: #171717;
  text-decoration: none;
  font-size: 1rem;
}
</style>
