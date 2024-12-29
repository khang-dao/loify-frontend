<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { openUrlInNewTab } from '@/utils/browser'

const {
  trackName = 'N/A',
  artistName = 'N/A',
  imgSrc,
  imgAlt = 'Cannot load image',
  explicit,
  url
} = defineProps<{
  trackName: string
  artistName: string
  imgSrc?: string
  imgAlt?: string
  explicit: boolean
  url: string
}>()
</script>

<template>
  <div class="container">
    <img :src="imgSrc" :alt="imgAlt" width="100" height="100" />

    <div class="metadata-container">
      <div class="text-container">
        <h3>{{ trackName }}</h3>
        <p>{{ artistName }}</p>
      </div>
      <div class="icon-container">
        <p class="explicit" v-if="explicit">E</p>
        <FontAwesomeIcon :icon="['fab', 'spotify']" class="icon spotify" @click="openUrlInNewTab(url)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  word-break: break-word;
  font-family: var(--font-family-secondary);
}

.metadata-container {
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 1rem;
  width: 100%;
}

.text-container {
  display: flex;
  flex-direction: column;
  color: #000000;
  gap: 0.4rem;

  p {
    color: #6a6a6a;
  }
}

img {
  border-radius: var(--border-radius-lg);
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.explicit {
  color: rgb(255, 80, 80);
}

.icon.spotify {
  opacity: 0.5;
  color: #615d59;
  font-size: 22px;
}

@media (max-width: 1200px) {
  img {
    width: 100%;
    border-radius: var(--border-radius-sm);
  }

  .container {
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
  }

  .metadata-container {
    display: flex;
    flex: 0 0 1;
    gap: 1rem;
    padding: 0.25rem;
    width: 100%;
  }

  .icon-container {
    align-self: flex-start;
  }
}

@media (max-width: 768px) {
  .text-container {
    font-size: 0.5rem;
  }

  .icon-container {
    font-size: 0.75rem;
    gap: 0.3rem;
  }
}
</style>
