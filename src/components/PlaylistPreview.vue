<script setup lang="ts">
const { playlistName="N/A", imgSrc, imgAlt="Cannot load image" } = defineProps<{
  playlistName: string
  imgSrc: string
  imgAlt?: string
}>()
</script>

<template>
  <div class="container">
    <h2 class="playlist-heading"><slot></slot></h2>
    <img :src="imgSrc" alt="imgAlt" width="175" height="175"/> 
    <h2 class="playlist-name">{{playlistName}}</h2>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.playlist-heading {
  font-family: 'League Spartan', sans-serif;
  color: #FFFFFF;
  text-align: center;
  font-size: 2rem;
}

.playlist-name {
  font-family: 'League Spartan', sans-serif;
  color: #FFFFFF;
  text-align: center;
  font-size: 1rem;
}

img {
  border-radius: 0.5rem;
}

</style>
