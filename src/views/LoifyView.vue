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

const loifyedPlaylist = ref(null)

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
    loifyedPlaylist.value = response.data  // TODO: get the response status (status or status code?) 
    
    console.log(loifyedPlaylist.value)
}

function openLoifyedPlaylistInSpotify() {
  window.open(loifyedPlaylist.value.external_urls.spotify, '_blank');  // Opens the URL in a new tab
}

async function getPlaylistData(playlistId: string) {
  const url = `http://localhost:8080/api/spotify/playlists/${playlistId}`
  const playlistData = await axios.get(url)
  return playlistData.data
}

function reset() {
  // TODO: this function resets the values of (TBD) reactive/refs above 
  // NOTE: this is for AFTER new playlist creation
}


onMounted(() => fetchPlaylists())
</script>

<template>
  <main class="main">
    <div class="column column-1" v-if="!loifyedPlaylist">
      <h2 class="col-heading">P L A Y L I S T S</h2>
      <PlaylistItem v-for="(name, index) in playlists.names" @click="selectPlaylist" :selected="selectedPlaylist === playlists.id[index]" :playlistId="playlists.id[index]" :key="index" :playlistName="name" :imgSrc="playlists.images[index]"/>
    </div>

    <div class="column column-1" v-else>
      <h2 class="col-heading">O R I G I N A L<br>P L A Y L I S T</h2>
      <img :src="loifyedPlaylist.images?.[0]?.url" alt="No Image Available" width="175" height="175"/> 
      
      
      <h2 class="col-heading">N E W<br>P L A Y L I S T</h2>
      <!-- <img :src="loifyedPlaylist.images?.[0]?.url" alt="No Image Available" width="175" height="175"/>  -->
      <h2>{{loifyedPlaylist.name}}</h2>


      <button @click="openLoifyedPlaylistInSpotify()">click here to see playlist in spotify</button>
      <button @click="console.log('hello world')">click here to restart</button>
    </div>


    <div class="column column-2">
      <h2 class="col-heading">S O N G S</h2>
      <TrackItem v-for="(name, index) in tracks.names" :key="index" :trackName="name" :artistName="tracks.artists[index]" :imgSrc="tracks.images[index]"/>
    </div>

    <div class="column column-3">
      <div class="heading-container">
        <button @click="fetchLoifyedTracks()">Generate Loifyed Songs 🍃</button>   // 

        <h2 class="col-heading">🍃</h2>
        <button @click="createLoifyedPlaylist()">Create new playlist with loifyed songs 💚</button>    <!-- TODO: Refactor the multi-fn @click, probably create a new fn that calls both these fns -->
      </div>
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
  font-size: 2rem;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1rem;
  overflow: auto;
  padding-top: 3rem;
}

.heading-container {
  display: flex;
  gap: 1rem;
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
