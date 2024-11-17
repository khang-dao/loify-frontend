<script setup lang="ts">
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { provide } from 'vue'

import { usePlaylist } from '@/hooks/usePlaylist'

import LoifyPlaylistColumn from '@/components/columns/LoifyPlaylistColumn.vue'
import PlaylistColumn from '@/components/columns/PlaylistColumn.vue'
import TrackColumn from '@/components/columns/TrackColumn.vue'
import LoifyTrackColumn from '@/components/columns/LoifyTrackColumn.vue'
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal.vue'

const playlistState = usePlaylist()
provide('playlistState', playlistState)

const handleDelete = () => {
  playlistState.toggles.deleteModalToggle.toggle()
  playlistState.actions.deleteAllPlaylistsAndRefetch()
}
</script>

<template>
  <main class="main">
    <DeleteConfirmationModal
      v-if="playlistState.toggles.deleteModalToggle.state.value"
      message="Are you sure you want to delete all loify playlists?"
      :onCancelDelete="playlistState.toggles.deleteModalToggle.toggle"
      :onConfirmDelete="handleDelete"
    />

    <LoifyPlaylistColumn v-if="playlistState.toggles.loifyPlaylistToggle.state.value" />
    <PlaylistColumn v-else />
    <TrackColumn />
    <LoifyTrackColumn />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  height: 100vh;
  overflow: auto;
  flex: 1;
  padding: 2rem;
  gap: 2rem;
}
</style>
