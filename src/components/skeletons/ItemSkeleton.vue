<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="picture"></div>

    <div class="text-container">
      <h3>...</h3>
      <p>...</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.picture {
  border-radius: 0.5rem;
  background-color: grey;
  height: 100px;
  width: 100px;
}

.text-container {
  display: flex;
  flex-direction: column;
  font-family: 'League Spartan', sans-serif;
  color: #6a6a6a;
  gap: 0.4rem;
}

img {
  border-radius: 0.5rem;
}
</style>
