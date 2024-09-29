<script setup lang="ts">
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'

import axios from 'axios'
import { ref, reactive, watchEffect, onMounted } from 'vue';


const selectedPlaylist = ref(null)

const selectPlaylist = (e) => { 
  console.log(e.target.id)
  selectedPlaylist.value = e.target.id
}


const playlists = reactive({
    id: [],
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

    playlists.id = playlistsData.map((p) => p.id)
    playlists.names = playlistsData.map((p) => p.name)
    playlists.images = playlistsData.map((p) => p.images?.[0].url)
}

async function fetchTracks() { 
    const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value}/tracks`
    const response = await axios.get(url)
    const tracksData = response.data.items

    tracks.names = tracksData.map((t) => t.track.name)
    tracks.images = tracksData.map((t) => t.track.album.images?.[0].url)
    tracks.artists = tracksData.map((t) => t.track.artists?.[0].name)
}

watchEffect(async () => {
  fetchTracks()
})

async function fetchLoifyedTracks() {
    const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value}/tracks/loify`
    const response = await axios.get(url)
    const loifyedTracksData = response.data

    loifyedTracks.names = loifyedTracksData.map((t) => t.tracks.items?.[0]?.name)
    loifyedTracks.images = loifyedTracksData.map((t) => t.tracks.items?.[0]?.album.images?.[0]?.url)
    loifyedTracks.artists = loifyedTracksData.map((t) => t.tracks.items?.[0]?.artists?.[0]?.name)
}

async function createLoifyedPlaylist() {
    const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value}/tracks/loify`  // TODO: update url
    const response = await axios.post(url)
    const loifyedPlaylistData = response.data  // TODO: get the response status (status or status code?) 
    
    const spotifyUrl = loifyedPlaylistData.external_urls.spotify
    console.log(spotifyUrl)
}


onMounted(() => fetchPlaylists())
</script>

<template>
  <main class="main">
    <div class="column column-1">
      <h2 class="col-heading">P L A Y L I S T S</h2>
      <PlaylistItem v-for="(name, index) in playlists.names" @click="selectPlaylist" :selected="selectedPlaylist === playlists.id[index]" :playlistId="playlists.id[index]" :key="index" :playlistName="name" :imgSrc="playlists.images[index]"/>
    </div>

    <div class="column column-2">
      <h2 class="col-heading">S O N G S</h2>
      <TrackItem v-for="(name, index) in tracks.names" :key="index" :trackName="name" :artistName="tracks.artists[index]" :imgSrc="tracks.images[index]"/>
    </div>

    <div class="column column-3">
      <h2 class="col-heading">S O N G S 🍃</h2>
      <button @click="fetchLoifyedTracks">Generate Loifyed Songs 🍃</button>
      <button @click="createLoifyedPlaylist">Create new playlist with loifyed songs 💚</button>
      <TrackItem v-for="(name, index) in loifyedTracks.names" :key="index" :trackName="name" :artistName="loifyedTracks.artists[index]" :imgSrc="loifyedTracks.images[index]"/>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  background: #232323;
  height: 100vh;
  overflow: auto;
  flex:1
}

.col-heading {
  font-family: 'League Spartan', sans-serif;
  color: #FFFFFF;
  text-align: center;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1rem;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0.7rem;
}

::-webkit-scrollbar-track {
  background: #232323;
  margin-top: 5rem;
  margin-bottom: 1rem;
}

::-webkit-scrollbar-thumb {
  background-color: #3b3b3b;
  border-radius: 1rem;
}

</style>
