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
    <h3 :id="playlistId">{{ playlistName }}</h3>
    <FontAwesomeIcon
      :icon="['fas', 'circle-minus']"
      :class="['icon', 'delete', { selected: deleteButton.isSelected, confirmed: deleteButton.isConfirmed }]"
      v-if="isLoifyPlaylist && !deleteButton.isConfirmed"
      @click="handleDelete"
    />
    <FontAwesomeIcon :icon="['fab', 'spotify']" class="icon spotify" @click="openUrlInNewTab(props.url)" />
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
  font-family: var(--font-family-secondary);
  color: #000000;
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

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: relative;
  }

  h3 {
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
  }

  .icon {
    display: none;
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
</style>
