<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="main">
    <div class="container">
      <h1 class="heading">
        Our application uses Spotify's implementation of the secure OAuth 2.0 framework to safeguard
        your data and ensure your privacy is protected.
      </h1>
      <a class="button" href="http://localhost:8080/api/spotify/login" rel="noopener noreferrer">
        click to login
      </a>
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
  margin: 10rem;
  text-align: center;
}

.heading {
  color: #FFFFFF;
  font-size: 1.5rem;
}

.button {
  text-decoration: none;
  font-size: 1rem;
  color: #6A6A6A;
  cursor: pointer
}
</style>
