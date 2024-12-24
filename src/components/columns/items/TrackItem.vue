<script setup lang="ts">
const {
  trackName = 'N/A',
  artistName = 'N/A',
  imgSrc,
  imgAlt = 'Cannot load image'
} = defineProps<{
  trackName: string
  artistName: string
  imgSrc?: string
  imgAlt?: string
}>()
</script>

<template>
  <div class="container">
    <img :src="imgSrc" :alt="imgAlt" width="100" height="100" />

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
  word-break: break-word;
}

.text-container {
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-secondary);
  color: #000000;
  gap: 0.4rem;

  p {
    color: #6a6a6a;
  }
}

img {
  border-radius: 0.5rem;
}

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 0.25rem;
    position: relative;
  }

  .text-container {
    font-size: 0.5rem;

    position: absolute;
    top: 0;
    left: 0; 
    width: 100%;
    height: 100%;
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    color: white; 
    padding: 0.25rem;
    background-color: rgba(0, 0, 0, 0.2); 
    border-radius: 0.4rem;
  }

  img {
    border-radius: 0.4rem;
    width: 100%;
  }

  p {
    display: none;
  }
}
</style>
