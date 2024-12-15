<script setup lang="ts">
const {
  playlistName = 'N/A',
  imgSrc,
  imgAlt = 'Cannot load image'
} = defineProps<{
  playlistName?: string
  imgSrc?: string
  imgAlt?: string
}>()
</script>

<template>
  <div class="container">
    <h2 class="playlist-heading"><slot></slot></h2>
    <img :src="imgSrc" :alt="imgAlt" width="150" height="150" />
    <h2 class="playlist-name">{{ playlistName }}</h2>
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
  font-family: 'night-pumpkind', sans-serif;
  color: #000000;
  text-align: center;
  font-size: 2rem;
}

.playlist-name {
  font-family: 'league-spartan', sans-serif;
  color: #000000;
  text-align: center;
  font-size: 1.25rem;
}

img {
  border-radius: 0.5rem;
}

@media (max-width: 768px) {
  .container {
    gap: 0.5rem;
  }
  
  .playlist-heading {
    font-size: 0.6rem;
  }

  .playlist-name {
    font-size: 0.6rem;
  }
}
</style>
