<script setup lang="ts">
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'

import axios from 'axios'
import { reactive, onMounted } from 'vue';

const playlists = reactive({
    names: [],
    images: []
})

const tracks = reactive({
    names: [],
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

    console.log(tracksData)

    tracks.names = tracksData.map((p) => p.track.name)
    tracks.images = tracksData.map((p) => p.track.album.images?.[0].url)

    console.log(tracks.names)
    console.log(tracks.images)
}

onMounted(() => {
    fetchPlaylists()
    fetchTracks()
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
      <PlaylistItem v-for="(name, index) in tracks.names" :key="index" :playlistName="name" :imgSrc="tracks.images[index]"/>

      <!-- <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/> -->
    </div>

    <div class="column column-3">
      <h2>S O N G S 🍃</h2>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
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
  align-items: center;
  gap: 1rem
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
