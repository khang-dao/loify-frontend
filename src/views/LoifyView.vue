<script setup lang="ts">
import PlaylistPreview from '@/components/PlaylistPreview.vue'
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue'
import { useUserStore } from '@/stores/user'

import { ref, reactive, watchEffect, onMounted } from 'vue'

import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'


const userStore = useUserStore()

interface Playlist {
  id: string
  name: string
  imageUrl: string
}

interface Track {
  id: string
  name: string
  artist: string
  image: string
}




const loifyedTracks: Track[] = reactive([])
async function fetchLoifyedTracks() {
  loifyedTracks.length = 0
  
  const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks/loify`
  const response = await axios.get(url, { withCredentials: true })
  const loifyedTracksData = response.data
  
  loifyedTracksData.forEach((item) => {
    loifyedTracks.push({
      id: item?.tracks?.items?.[0]?.id,
      name: item?.tracks?.items?.[0]?.name,
      artist: item?.tracks?.items?.[0]?.artists?.[0]?.name,
      image: item?.tracks?.items?.[0]?.album?.images?.[0]?.url
    })
  })
}

const loifyedPlaylist = ref(null)
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
}

function reset() {
  // TODO: this function resets the values of (TBD) reactive/refs above
  // NOTE: this is for AFTER new playlist creation
}


const selectedPlaylist = ref(null)
const selectPlaylist = (e) => {
  console.log(e.target.id)
  const selectedId = e.target.id
  selectedPlaylist.value = playlistsDataQuery.data.value.find((p) => p.id === selectedId) || null
  console.log(selectedPlaylist.value)
}

const playlistsDataQuery = useQuery({
  queryKey: ['playlistData'],
  queryFn: async () => {
    const url = 'http://localhost:8080/api/spotify/me/playlists'
    const response = await axios.get(url, { withCredentials: true })
    const playlistsData = response.data.items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.images?.[0].url
    }))
    console.log(playlistsData)

    return playlistsData
  }
})

const tracksDataQuery = useQuery({
  queryKey: ['tracksData', selectedPlaylist],
  queryFn: async () => {
    const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks`
    const response = await axios.get(url, { withCredentials: true })
    const tracksData = response.data.items.map((item) => ({
      id: item.track?.id,
      name: item.track?.name,
      artist: item.track?.artists?.[0].name,
      image: item.track?.album.images?.[0].url
    }))

    return tracksData
  }
})



// onMounted(() => fetchPlaylists())
</script>

<template>
  <main class="main">
    <div :class="`column column-1 ${playlistsDataQuery.isFetching.value ? 'skeleton' : ''}`" v-if="!loifyedPlaylist?.images?.[0]">
      <!-- TODO: can refactor to a var?  -->

      <button @click="userStore.logout">LOGOUT</button>

      <h2 class="col-heading">P L A Y L I S T S</h2>
      <template v-if="playlistsDataQuery.isFetching.value">
        <ItemSkeleton v-for="index in 7" :key="index" />
      </template>

      <template v-else>
        <PlaylistItem
          v-for="item in playlistsDataQuery.data.value"
          @click="selectPlaylist"
          :selected="selectedPlaylist?.id === item.id"
          :playlistId="item.id"
          :key="item.id"
          :playlistName="item.name"
          :imgSrc="item.image"
        />
      </template>
    </div>

    <div class="column column-1" v-else>
      <PlaylistPreview :playlistName="selectedPlaylist.name" :imgSrc="selectedPlaylist.imageUrl"> O R I G I N A L<br />P L A Y L I S T</PlaylistPreview>
      <PlaylistPreview :playlistName="loifyedPlaylist.name" :imgSrc="loifyedPlaylist.images?.[0]?.url">N E W<br />P L A Y L I S T</PlaylistPreview>
      <button @click="openLoifyedPlaylistInSpotify()">click here to see playlist in spotify</button>
      <button @click="console.log('hello world')">click here to restart</button>
    </div>

    <div :class="`column column-2 ${tracksDataQuery.isFetching.value ? 'skeleton': ''}`">
      <h2 class="col-heading">S O N G S</h2>
      <template v-if="tracksDataQuery.isFetching.value">
        <ItemSkeleton v-for="index in 20" :key="index" />
      </template>
      <template v-else>
        <TrackItem v-for="item in tracksDataQuery.data.value" :key="item.id" :trackName="item.name" :artistName="item.artist" :imgSrc="item.image"/>
      </template>
    </div>

    <div :class="`column column-3 ${!loifyedTracks.length ? 'skeleton' : ''}`">
      <div class="heading-container">
        <button @click="fetchLoifyedTracks()">Generate Loifyed Songs 🍃</button> //

        <h2 class="col-heading">🍃</h2>
        <button @click="createLoifyedPlaylist()">Create new playlist with loifyed songs 💚</button>
      </div>
      <template v-if="loifyedTracks.length">
        <TrackItem
          v-for="item in loifyedTracks"
          :key="item.id"
          :trackName="item.name"
          :artistName="item.artist"
          :imgSrc="item.image"
        />
      </template>

      <template v-else>
        <ItemSkeleton v-for="index in 20" :key="index" />
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

.column.skeleton {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1rem;
  overflow: hidden;
  padding-top: 3rem;
}

.heading-container {
  display: flex;
  gap: 1rem;
}

.column::-webkit-scrollbar {
  width: 0.7rem;
}

.column::-webkit-scrollbar-track {
  background: #232323;
  margin-top: 5rem;
  margin-bottom: 1rem;
}

.column::-webkit-scrollbar-thumb {
  background-color: #3b3b3b;
  border-radius: 1rem;
}
</style>
