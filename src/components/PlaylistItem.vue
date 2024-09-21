<script setup lang="ts">
const { playlistName, imgSrc, imgAlt="Cannot load image" } = defineProps<{
  playlistName: string
  imgSrc: string
  imgAlt?: string
}>()
</script>

<template>
  <div class="container">
    <img :src="imgSrc" :alt="imgAlt" width="100" height="100"/>
    <h3>{{ playlistName }}</h3>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
</style>
