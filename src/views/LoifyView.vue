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

const selectedPlaylist = ref(null)
const selectPlaylist = (e) => {
  console.log(e.target.id)
  const selectedId = e.target.id
  selectedPlaylist.value = playlists.find((p) => p.id === selectedId) || null
  console.log(selectedPlaylist.value)
}

const playlists: Playlist[] = reactive([])
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
  })
}

const tracks: Track[] = reactive([])
async function fetchTracks() {
  tracks.length = 0

  const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks`
  const response = await axios.get(url, { withCredentials: true })
  const tracksData = response.data.items

  tracksData.forEach((item) => {
    tracks.push({
      id: item.track?.id,
      name: item.track?.name,
      artist: item.track?.artists?.[0].name,
      image: item.track?.album.images?.[0].url
    })
  })
}
watchEffect(async () => {
  fetchTracks()
  console.log('YAAAA: ', tracksDataQuery.data.value.map((item) => item.track?.name))
  console.log('HEY: ', tracksDataQuery.isLoading.value, tracksDataQuery.isError.value, tracksDataQuery.isSuccess.value)
})

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




const tracksDataQuery = useQuery({
  queryKey: ['tracksData', selectedPlaylist],
  queryFn: async () => {
    const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks`
    const response = await axios.get(url, { withCredentials: true })
    const tracksData = response.data.items
    return tracksData
  }
})





onMounted(() => fetchPlaylists())
</script>

<template>
  <div v-if="tracksDataQuery.isLoading.value">Loading...</div>
  <div v-else-if="tracksDataQuery.isError.value">Error loading tracks</div>
  <div v-else-if="tracksDataQuery.data.value">
      <p v-for="item in tracksDataQuery.data.value" :key="item?.track?.id">
        {{ item?.track?.name }}
      </p>
  </div>
<!-- 
  <p>
    {{ tracksDataQuery.data.value[0] }}
  </p> -->


  <main class="main">
    <div class="column column-1" v-if="!loifyedPlaylist?.images?.[0]">
      <!-- TODO: can refactor to a var?  -->

      <button @click="userStore.logout">LOGOUT</button>

      <h2 class="col-heading">P L A Y L I S T S</h2>
      <template v-if="playlists.length">
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
        <ItemSkeleton v-for="index in 7" :key="index" />
      </template>
    </div>

    <div :class="`column column-2 ${!playlists.length ? 'skeleton' : ''}`" v-else>
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

    <div :class="`column column-2 ${!tracks.length ? 'skeleton' : ''}`">
      <h2 class="col-heading">S O N G S</h2>
      <template v-if="tracks.length">
        <TrackItem
          v-for="item in tracks"
          :key="`${item.name}, ${item.artist}`"
          :trackName="item.name"
          :artistName="item.artist"
          :imgSrc="item.image"
        />
      </template>

      <template v-else>
        <ItemSkeleton v-for="index in 20" :key="index" />
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
          :key="`${item.name}, ${item.artist}`"
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
