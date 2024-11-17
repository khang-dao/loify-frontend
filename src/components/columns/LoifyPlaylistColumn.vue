<script setup lang="ts">
import PlaylistPreview from '@/components/PlaylistPreview.vue'
import PlaylistPreviewSkeleton from '@/components/skeletons/PlaylistPreviewSkeleton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { openUrlInNewTab } from '@/utils/browser'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { inject } from 'vue'

const playlistState: any = inject('playlistState')
if (!playlistState) throw new Error('Playlist state not found')

const { loifyPlaylist, selectedPlaylist, actions } = playlistState
</script>

<template>
  <div class="column col-1">
    <PlaylistPreview :playlistName="selectedPlaylist?.name" :imgSrc="selectedPlaylist?.image"
      >o r i g i n a l<br />p l a y l i s t</PlaylistPreview
    >
    <PlaylistPreview
      @click="openUrlInNewTab(loifyPlaylist.url)"
      :playlistName="loifyPlaylist.name"
      :imgSrc="loifyPlaylist.image"
      v-if="loifyPlaylist.image"
      >n e w<br />p l a y l i s t</PlaylistPreview
    >
    <PlaylistPreviewSkeleton v-else />

    <div class="icon-container">
      <FontAwesomeIcon
        :icon="['fab', 'spotify']"
        @click="openUrlInNewTab(loifyPlaylist.url)"
        class="icon spotify"
        v-show="loifyPlaylist.image"
      />
      <FontAwesomeIcon
        :icon="['fas', 'arrow-rotate-left']"
        @click="actions.reset"
        class="icon restart"
      />
      <router-link to="/logout"
        ><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon"
      /></router-link>
    </div>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1.5rem;
  padding-top: 3rem;
  background-color: #aeaed0;
  border-radius: 0.5rem;
  overflow: auto;
}
.icon-container {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
}

.icon {
  font-size: 2.5rem;
  color: #847f95;
  cursor: pointer;
}
</style>
