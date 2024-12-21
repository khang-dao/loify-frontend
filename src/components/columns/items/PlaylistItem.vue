<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { reactive } from 'vue'

import { containsLoify } from '@/utils/string'

const props = defineProps<{
  playlistId: string
  playlistName: string
  imgSrc?: string
  imgAlt?: string
  selected: boolean
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
    <img
      :class="[{ selected: selected }]"
      :src="imgSrc"
      :alt="imgAlt"
      width="100"
      height="100"
      :id="playlistId"
    />
    <h3 :id="playlistId">{{ playlistName }}</h3>
    <FontAwesomeIcon
      :icon="['fas', 'circle-minus']"
      class="icon delete"
      :class="[
        'icon',
        'delete',
        { selected: deleteButton.isSelected, confirmed: deleteButton.isConfirmed }
      ]"
      v-if="isLoifyPlaylist && !deleteButton.isConfirmed"
      :onClick="handleDelete"
    />
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
  border-radius: 0.5rem;
}

.icon.delete {
  color: rgb(149, 149, 149);
  font-size: 1.2rem;
}

.icon.delete.selected {
  color: rgb(255, 48, 48);
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
    position: absolute; /* Allows the text-container to be positioned relative to .container */
    top: 0; /* Place it at the top */
    left: 0; /* Align with the left edge */
    width: 100%; /* Match the width of the container */
    height: 100%; /* Optional, match the height */
    display: flex; /* Enables centering */
    flex-direction: column; /* Stack elements vertically */
    justify-content: center; /* Center items vertically */
    align-items: center; /* Center items horizontally */
    color: white; /* Ensure the text is visible over the image */
    padding: 0.25rem;
  }

  .icon {
    display: none;
  }

  img {
    width: 100%;
    border-radius: 0.4rem;
  }

  div.selected {
    padding: 0.3rem;
    border-radius: 0.2rem;
  }
}
</style>
