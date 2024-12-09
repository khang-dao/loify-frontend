<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <img src="" />
    <div class="container">
      <h1 class="heading">Welcome to</h1>
      <img src="/images/loify-logo.png" />
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
  font-family: 'league-spartan', sans-serif;

  img {
    width: 13rem;
    height: auto;
  }
}

.heading {
  color: #000000;
  font-size: 2rem;
  font-family: 'night-pumpkind', sans-serif;
  font-weight: 100;
}

.subheading {
  color: #171717;
  text-decoration: none;
  font-size: 1rem;
}
</style>
