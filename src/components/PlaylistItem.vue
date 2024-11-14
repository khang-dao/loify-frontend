<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { containsLoify } from '@/utils/string';
import { reactive } from 'vue';

const props = defineProps<{
  playlistId: string;
  playlistName: string;
  imgSrc: string;
  imgAlt?: string;
  selected: boolean;
  handleDelete: (id: string) => void; 
}>();

const imgAlt = props.imgAlt ?? "Cannot load image";
const isLoifyPlaylist = containsLoify(props.playlistName)


const deleteButton = reactive({ isSelected: false, isConfirmed: false })
const handleDelete = async () => {
  if (!deleteButton.isSelected) {
      deleteButton.isSelected = true;
  } else {
      deleteButton.isConfirmed = true;
      props.handleDelete(props.playlistId)
  }
}

</script>

<template>
  <div :class="['container', { selected: selected }]" :id="playlistId">    <!-- TODO: Set the `playlistId` in some other way -->
    <img :class="[ { selected: selected }]" :src="imgSrc" :alt="imgAlt" width="100" height="100" :id="playlistId"/>    <!-- TODO: Set the `playlistId` in some other way -->
    <h3 :id="playlistId">{{ playlistName }}</h3>    <!-- TODO: Set the `playlistId` in some other way -->
    <FontAwesomeIcon :icon="['fas', 'circle-minus']" class="icon delete" :class="['icon', 'delete', { selected: deleteButton.isSelected, confirmed: deleteButton.isConfirmed }]" v-if="isLoifyPlaylist && !deleteButton.isConfirmed" :onClick="handleDelete"/>
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

.icon.delete {
  color: rgb(149, 149, 149);
  font-size: 1.2rem;
}

.icon.delete.selected {
  color: rgb(255, 48, 48);
}
</style>
