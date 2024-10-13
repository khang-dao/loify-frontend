<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <img src="">
    <div class="container">
      <h1 class="heading">Welcome to</h1>
      <img src="/images/loify-logo.png">
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

  background-image: url('/images/main-background.png'); /* Path to your image */
  background-size: cover; /* Ensures the image covers the entire element */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents tiling/repeating of the image */
  /* width: 100vw; Full viewport width */
  /* height: 100vh; Full viewport height */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: 'League Spartan', sans-serif;
  
  img {
    width: 13rem;
    height: auto
  }
}

.heading {
  color: #000000;
  font-size: 2rem;
  font-family: 'night-pumpkind', sans-serif;
  font-weight: 100;
}

.subheading {
  color: #000000;
  text-decoration: none;
  font-size: 1rem;
}
</style>
