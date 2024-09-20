<script setup lang="ts">
const { trackName, artistName, imgSrc, imgAlt="Cannot load image" } = defineProps<{
  trackName: string
  artistName: string
  imgSrc: string
  imgAlt?: string
}>()
</script>

<template>
  <div class="container">
    <img :src="imgSrc" :alt="imgAlt" width="100" height="100"/>

    <div class="text-container">
      <h3>{{ trackName }}</h3>
      <p>{{ artistName }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.text-container {
  display: flex;
  flex-direction: column;
}
</style>
