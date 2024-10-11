<script setup lang="ts">
const { trackName="N/A", artistName="N/A", imgSrc, imgAlt="Cannot load image" } = defineProps<{
  trackName: string
  artistName: string
  imgSrc?: string
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
  font-family: 'League Spartan', sans-serif;
  color: #FFFFFF;
  gap: 0.4rem;

  p {
    color: #6A6A6A;
  }
}

img {
  border-radius: 0.5rem;
}

</style>
