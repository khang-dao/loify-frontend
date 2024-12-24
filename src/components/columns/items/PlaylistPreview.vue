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
  border-radius: 0.5rem;
}

@media (max-width: 1024px) {
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
