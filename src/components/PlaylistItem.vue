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
    <img :src="imgSrc" :alt="imgAlt" width="100" height="100" :id="playlistId"/>    <!-- TODO: Set the `playlistId` in some other way -->
    <h3 :id="playlistId">{{ playlistName }}</h3>    <!-- TODO: Set the `playlistId` in some other way -->
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

h3 {
  flex-grow: 1;
}

.selected {
  border: 1px solid rgb(169, 112, 208);
}
</style>
