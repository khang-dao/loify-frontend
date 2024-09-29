<script setup lang="ts">
import LoginButton from '@/components/LoginButton.vue'
</script>

<template>
  <main class="main">
    <div class="container">
      <h1 class="heading">
        Our application uses Spotify's implementation of the secure OAuth 2.0 framework to safeguard
        your data and ensure your privacy is protected.
      </h1>
      <LoginButton>click to login</LoginButton>
    </div>
  </main>
</template>

<style scoped>
.main {
  background: #232323;
  height: 98vh;
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

.subheading {
  text-decoration: none;
  color: #6A6A6A;
  font-size: 1rem;
}
</style>
