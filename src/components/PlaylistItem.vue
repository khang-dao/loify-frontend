<script setup lang="ts">
const { playlistId, playlistName, imgSrc, imgAlt="Cannot load image", selected} = defineProps<{
  playlistId: string
  playlistName: string
  imgSrc: string
  imgAlt?: string
  selected: boolean
}>()
</script>

<template>
  <div :class="['container', { selected: selected }]" :id="playlistId">    <!-- TODO: Set the `playlistId` in some other way -->
    <img :class="[ { selected: selected }]" :src="imgSrc" :alt="imgAlt" width="100" height="100" :id="playlistId"/>    <!-- TODO: Set the `playlistId` in some other way -->
    <h3 :id="playlistId">{{ playlistName }}</h3>    <!-- TODO: Set the `playlistId` in some other way -->
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  min-height: min-content;
  opacity: 0.5;
}

h3 {
  flex-grow: 1;
  font-family: 'League Spartan', sans-serif;
  color: #000000
}

.selected.container {
  opacity: 1;
}

div.selected {
  background-color: #837F94;
  padding: 0.7rem;
  border-radius: 0.3rem;
}

img {
  border-radius: 0.5rem;
}
</style>
