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
    <h2 class="playlist-heading"><slot /></h2>
    <img :src="imgSrc" :alt="imgAlt" width="130" height="130" />
    <h2 class="playlist-name">{{ playlistName }}</h2>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 70%;
}

.playlist-heading {
  font-family: var(--font-family-primary);
  color: #000000;
  text-align: center;
  font-size: 2rem;
}

.playlist-name {
  font-family: var(--font-family-secondary);
  color: #000000;
  text-align: center;
  font-size: 1.25rem;
}

img {
  border-radius: var(--border-radius-lg);
}

@media (max-width: 1200px) {
  .playlist-heading {
    font-size: var(--font-size-md);
  }
}

@media (max-width: 768px) {
  .container {
    gap: 0.5rem;
  }

  .playlist-heading {
    font-size: var(--font-size-sm);
  }

  .playlist-name {
    font-size: var(--font-size-sm);
  }
}
</style>
