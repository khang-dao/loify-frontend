<script setup lang="ts">
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'

import axios from 'axios'
import { ref, reactive, onMounted } from 'vue';

const showLoifyedTracks = ref(false)

function toggleShowLoifyedTracks () {
    showLoifyedTracks.value = !showLoifyedTracks.value
}

const playlists = reactive({
    names: [],
    images: []
})

const tracks = reactive({
    names: [],
    artists: [],
    images: []
})

const loifyedTracks = reactive({
    names: [],
    artists: [],
    images: []
})


async function fetchPlaylists() {
    const url = "http://localhost:8080/api/spotify/me/playlists"
    const response = await axios.get(url)
    const playlistsData = response.data.items

    playlists.names = playlistsData.map((p) => p.name)
    playlists.images = playlistsData.map((p) => p.images?.[0].url)
}

async function fetchTracks() { 
    const playlistId = "3rfEyXgEK3zaUp1Cjj5qhL"
    const url = `http://localhost:8080/api/spotify/playlists/${playlistId}/tracks`
    const response = await axios.get(url)
    const tracksData = response.data.items

    tracks.names = tracksData.map((t) => t.track.name)
    tracks.images = tracksData.map((t) => t.track.album.images?.[0].url)
    tracks.artists = tracksData.map((t) => t.track.artists?.[0].name)
}

async function fetchLoifyedTracks() {
    const playlistId = "3rfEyXgEK3zaUp1Cjj5qhL"
    const url = `http://localhost:8080/api/spotify/playlists/${playlistId}/tracks/loify`
    const response = await axios.get(url)
    const loifyedTracksData = response.data

    loifyedTracks.names = loifyedTracksData.map((t) => t.tracks.items?.[0]?.name)
    loifyedTracks.images = loifyedTracksData.map((t) => t.tracks.items?.[0]?.album.images?.[0]?.url)
    loifyedTracks.artists = loifyedTracksData.map((t) => t.tracks.items?.[0]?.artists?.[0]?.name)
}

onMounted(() => {
    fetchPlaylists()
    fetchTracks()
    fetchLoifyedTracks()
})
</script>

<template>
  <main>
    <div class="column column-1">
      <h2>P L A Y L I S T S</h2>
      <PlaylistItem v-for="(name, index) in playlists.names" :key="index" :playlistName="name" :imgSrc="playlists.images[index]"/>
    </div>

    <div class="column column-2">
      <h2>S O N G S</h2>
      <TrackItem v-for="(name, index) in tracks.names" :key="index" :trackName="name" :artistName="tracks.artists[index]" :imgSrc="tracks.images[index]"/>
    </div>

    <div class="column column-3">
      <h2>S O N G S 🍃</h2>
      <button @click="toggleShowLoifyedTracks">Show / Hide Loifyed Songs</button>
      <div class="column wrapper" v-if="showLoifyedTracks">
          <TrackItem v-for="(name, index) in loifyedTracks.names" :key="index" :trackName="name" :artistName="loifyedTracks.artists[index]" :imgSrc="loifyedTracks.images[index]"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  padding: 1rem
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wrapper {

}
</style>
