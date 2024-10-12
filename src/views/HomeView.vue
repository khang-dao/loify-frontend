<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <div class="container">
      <h1 class="heading">welcome to loify 🍃</h1>
      <RouterLink class="subheading" to="/login">click to begin</RouterLink>
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
  gap: 1rem;
  font-family: 'League Spartan', sans-serif;
}

.heading {
  color: #FFFFFF;
  font-size: 2rem;
}

.subheading {
  text-decoration: none;
  color: #6A6A6A;
  font-size: 1rem;
}
</style>
