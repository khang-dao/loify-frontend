<script setup lang="ts">
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { provide } from 'vue'

import { usePlaylist } from '@/hooks/usePlaylist'
import LoifyPlaylistColumn from '@/components/columns/LoifyPlaylistColumn.vue'
import PlaylistColumn from '@/components/columns/PlaylistColumn.vue'
import TrackColumn from '@/components/columns/TrackColumn.vue'
import LoifyTrackColumn from '@/components/columns/LoifyTrackColumn.vue'

const playlistState = usePlaylist()
provide('playlistState', playlistState)
</script>

<template>
  <main class="main">
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
