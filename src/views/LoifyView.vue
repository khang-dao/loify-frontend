<script setup lang="ts">
import PlaylistPreview from '@/components/PlaylistPreview.vue'
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue'
import { useUserStore } from '@/stores/user'

import axios from 'axios'
import { ref, reactive, watchEffect, onMounted } from 'vue'

const userStore = useUserStore()

interface playlistData {
  id: string
  name: string
  imageUrl: string
}

const selectedPlaylist = ref(null)

const selectPlaylist = (e) => {
  console.log(e.target.id)
  const selectedId = e.target.id
  selectedPlaylist.value = playlists.find((p) => p.id === selectedId) || null

  console.log(selectedPlaylist.value)
}

const playlists: playlistData[] = reactive([])

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
  const url = 'http://localhost:8080/api/spotify/me/playlists'
  const response = await axios.get(url, { withCredentials: true })
  const playlistsData = response.data.items

  playlistsData.forEach((item) => {
    playlists.push({
      id: item.id,
      name: item.name,
      imageUrl: item.images?.[0].url
    })
    console.log(item.images?.[0].url)
  })
}

async function fetchTracks() {
  tracks.names = []

  const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks`
  const response = await axios.get(url, { withCredentials: true })
  const tracksData = response.data.items

  tracks.names = tracksData.map((t) => t.track.name)
  tracks.images = tracksData.map((t) => t.track.album.images?.[0].url)
  tracks.artists = tracksData.map((t) => t.track.artists?.[0].name)
}

watchEffect(async () => {
  fetchTracks()
})

async function fetchLoifyedTracks() {
  loifyedTracks.names = []


  const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks/loify`
  const response = await axios.get(url, { withCredentials: true })
  const loifyedTracksData = response.data

  loifyedTracks.names = loifyedTracksData.map((t) => t.tracks.items?.[0]?.name)
  loifyedTracks.images = loifyedTracksData.map((t) => t.tracks.items?.[0]?.album.images?.[0]?.url)
  loifyedTracks.artists = loifyedTracksData.map((t) => t.tracks.items?.[0]?.artists?.[0]?.name)
}

async function createLoifyedPlaylist() {
  const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks/loify` // TODO: update url
  const response = await axios.post(url, { withCredentials: true })
  loifyedPlaylist.value = response.data // TODO: get the response status (status or status code?)

  await updateLoifyedPlaylistImage()
  console.log('HI: ', loifyedPlaylist.value)
}

function openLoifyedPlaylistInSpotify() {
  window.open(loifyedPlaylist.value.external_urls.spotify, '_blank') // Opens the URL in a new tab
  console.log(loifyedPlaylist.value)
}

async function updateLoifyedPlaylistImage() {
  const url = `http://localhost:8080/api/spotify/playlists/${loifyedPlaylist.value.id}`
  const playlistData = await axios.get(url, { withCredentials: true })
  loifyedPlaylist.value.images.push({ url: playlistData.data.images[0].url })
  // console.log("YA: ", playlistData.data.images?.[0].url)
  // return playlistData.data.images?.[0].url
}

function reset() {
  // TODO: this function resets the values of (TBD) reactive/refs above
  // NOTE: this is for AFTER new playlist creation
}

onMounted(() => fetchPlaylists())
</script>

<template>
  <main class="main">
    <div class="column column-1" v-if="!loifyedPlaylist?.images?.[0]">
      <!-- TODO: can refactor to a var?  -->
      
      <button @click="userStore.logout">LOGOUT</button>
      
      <h2 class="col-heading">P L A Y L I S T S</h2>
      <template v-if="playlists.length >= 46">
        <PlaylistItem 
        v-for="item in playlists"
        @click="selectPlaylist"
        :selected="selectedPlaylist?.id === item.id"
        :playlistId="item.id"
        :key="item.id"
        :playlistName="item.name"
        :imgSrc="item.imageUrl"
        />
      </template>

      <template v-else>
        <ItemSkeleton v-for="index in 7" :key="index"/>
      </template>
    </div>

    <div class="column column-1" v-else>
      <PlaylistPreview :playlistName="selectedPlaylist.name" :imgSrc="selectedPlaylist.imageUrl">
        O R I G I N A L<br />P L A Y L I S T
      </PlaylistPreview>

      <PlaylistPreview
        :playlistName="loifyedPlaylist.name"
        :imgSrc="loifyedPlaylist.images?.[0]?.url"
      >
        N E W<br />P L A Y L I S T
      </PlaylistPreview>

      <button @click="openLoifyedPlaylistInSpotify()">click here to see playlist in spotify</button>
      <button @click="console.log('hello world')">click here to restart</button>
    </div>

    <div class="column column-2">
      <h2 class="col-heading">S O N G S</h2>
      <template v-if="tracks.names.length >= 10">
        <TrackItem
        v-for="(name, index) in tracks.names"
        :key="index"
        :trackName="name"
        :artistName="tracks.artists[index]"
        :imgSrc="tracks.images[index]"
        />
      </template>

      <template v-else>
        <ItemSkeleton v-for="index in 7" :key="index"/>
      </template>
    </div>

    <div class="column column-3">
      <div class="heading-container">
        <button @click="fetchLoifyedTracks()">Generate Loifyed Songs 🍃</button> //

        <h2 class="col-heading">🍃</h2>
        <button @click="createLoifyedPlaylist()">Create new playlist with loifyed songs 💚</button>
        <!-- TODO: Refactor the multi-fn @click, probably create a new fn that calls both these fns -->
      </div>
      <template v-if="loifyedTracks.names.length >= 10">
        <TrackItem
        v-for="(name, index) in loifyedTracks.names"
        :key="index"
        :trackName="name"
        :artistName="loifyedTracks.artists[index]"
        :imgSrc="loifyedTracks.images[index]"
      />
      </template>

      <template v-else>
        <ItemSkeleton v-for="index in 7" :key="index"/>
      </template>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  background: #232323;
  height: 100vh;
  overflow: auto;
  flex: 1;
}

.col-heading {
  font-family: 'League Spartan', sans-serif;
  color: #ffffff;
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
