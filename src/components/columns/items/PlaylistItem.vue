<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { reactive } from 'vue'

import { openUrlInNewTab } from '@/utils/browser'
import { containsLoify } from '@/utils/string'

const props = defineProps<{
  playlistId: string
  playlistName: string
  imgSrc?: string
  imgAlt?: string
  selected: boolean
  url?: string
  handleDelete: (id: string) => void
}>()

const imgAlt = props.imgAlt ?? 'Cannot load image'
const isLoifyPlaylist = containsLoify(props.playlistName)

const deleteButton = reactive({ isSelected: false, isConfirmed: false })
const handleDelete = async () => {
  if (!deleteButton.isSelected) {
    deleteButton.isSelected = true
  } else {
    deleteButton.isConfirmed = true
    props.handleDelete(props.playlistId)
  }
}
</script>

<template>
  <div :class="['container', { selected: selected }]" :id="playlistId">
    <!-- TODO: Trigger the @click on this `div` elem to avoid duplication with `:id="playlistId"` in child elems -->
    <img :class="[{ selected: selected }]" :src="imgSrc" :alt="imgAlt" width="100" height="100" :id="playlistId" />

    <div class="metadata-container">
      <h3 class="text" :id="playlistId">{{ playlistName }}</h3>
      <div class="icon-container">
        <FontAwesomeIcon
          :icon="['fas', 'circle-minus']"
          :class="['icon', 'delete', { selected: deleteButton.isSelected, confirmed: deleteButton.isConfirmed }]"
          v-if="isLoifyPlaylist && !deleteButton.isConfirmed"
          @click="handleDelete"
        />
        <FontAwesomeIcon :icon="['fab', 'spotify']" class="icon spotify" @click="openUrlInNewTab(props.url!)" />
      </div>
    </div>
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

.metadata-container {
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 1rem;
  width: 100%;
}

.text {
  flex-grow: 1;
  font-family: var(--font-family-secondary);
  color: #000000;
}

.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.selected.container {
  opacity: 1;
}

div.selected {
  background-color: #837f94;
  padding: 0.7rem;
  border-radius: 0.3rem;
}

img {
  border-radius: var(--border-radius-lg);
}

.icon.delete {
  color: rgb(149, 149, 149);
  font-size: 22px;
}

.icon.delete.selected {
  color: rgb(255, 48, 48);
}

.icon.spotify {
  color: #615d59;
  font-size: 22px;
}

@media (max-width: 1200px) {
  .container {
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
  }

  .icon-container {
    flex-direction: row;
    gap: 0.5rem;
  }

  img {
    width: 100%;
    border-radius: var(--border-radius-sm);
  }

  div.selected {
    padding: 0.3rem;
    border-radius: 0.2rem;
  }
}

@media (max-width: 768px) {
  .text {
    font-size: 0.5rem;
  }

  .metadata-container {
    align-items: center;
  }

  .icon-container {
    gap: 0.2rem;
    align-items: center;
    flex-direction: column;
  }

  .icon.delete,
  .icon.spotify {
    font-size: 10px;
  } 
}
</style>
