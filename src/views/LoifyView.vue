<script setup lang="ts">
import PlaylistPreview from '@/components/PlaylistPreview.vue'
import PlaylistPreviewSkeleton from '@/components/skeletons/PlaylistPreviewSkeleton.vue'
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import ThemeButton from '@/components/buttons/ThemeButton.vue'

import { ref, reactive } from 'vue'

import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/vue-query'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


const selectedPlaylist = ref(null)
const selectPlaylist = (e) => {
  if (e.target.id === selectedPlaylist.value?.id) {
    deselectPlaylist()
  }
  else {
    toggleOffShowLoifyedTracks()
    
    console.log(e.target.id)
    const selectedId = e.target.id
    selectedPlaylist.value = playlistsDataQuery.data.value.find((p) => p.id === selectedId) || null
    console.log(selectedPlaylist.value)
  }
}

const deselectPlaylist = () => {
  toggleOffShowLoifyedTracks()
  selectedPlaylist.value = null
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

const loifyedTracksDataQuery = useQuery({
  queryKey: ['loifyedTracksData', selectedPlaylist],
  queryFn: async () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks/loify`
        const response = await axios.get(url, { withCredentials: true })
        const loifyedTracksData = response.data.map((item) => ({
          id: item?.tracks?.items?.[0]?.id,
          name: item?.tracks?.items?.[0]?.name,
          artist: item?.tracks?.items?.[0]?.artists?.[0]?.name,
          image: item?.tracks?.items?.[0]?.album?.images?.[0]?.url
        }))
        
        resolve(loifyedTracksData)  // Resolve after delay
      }, 3000) // Delay by 3 seconds
    })
  }
})

const showLoifyedTracks = ref(false)
function toggleOnShowLoifyedTracks() {
  if (selectedPlaylist.value ) {
    showLoifyedTracks.value = true
  }
}

function toggleOffShowLoifyedTracks() {
  showLoifyedTracks.value = false
}



const loifyedPlaylist = reactive({ id: '', name: '', image: '', url:'' })
function useCreateLoifyedPlaylist() { // NOTE: To use this as a hook, please pass in `selectedPlaylist` arg, instead of fetching it from global scope
  // Mutation to create the loifyed playlist
  const createPlaylistMutation = useMutation({
    mutationFn: async () => {
      // Use the selected playlist ID
      const url = `http://localhost:8080/api/spotify/playlists/${selectedPlaylist.value.id}/tracks/loify`;
      const response = await axios.post(url, { withCredentials: true });
      return response.data;
    },
    onSuccess: async (data) => {
      // On success, update the reactive loifyedPlaylist object
      loifyedPlaylist.id = data.id;
      loifyedPlaylist.name = data.name;
      loifyedPlaylist.image = data.images?.[0]?.url || '';
      loifyedPlaylist.url = data.external_urls.spotify;

      // getLoifyedPlaylistImage.refetch();
    },
});

  return { createPlaylistMutation, loifyedPlaylist };
}

const showLoifyedPlaylist = ref(false)
function toggleOnShowLoifyedPlaylist() {
  if (selectedPlaylist.value) {
    showLoifyedPlaylist.value = true
  }
}

// Fetch playlist image using Vue Query
const getLoifyedPlaylistImage = useQuery({
    queryKey: ['playlistImage', loifyedPlaylist],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const url = `http://localhost:8080/api/spotify/playlists/${loifyedPlaylist.id}`;
          const response = await axios.get(url, { withCredentials: true });
          loifyedPlaylist.image = response.data.images[0].url;
          resolve(response.data.images[0].url)
        }, 4000);
      });
    },
});

function openLoifyedPlaylistInSpotify() {
  window.open(loifyedPlaylist.url, '_blank') // Opens the URL in a new tab
  console.log(loifyedPlaylist)
}

// NOTE: This is only temporary, refactor this to import hooks
const { createPlaylistMutation } = useCreateLoifyedPlaylist()


function reset() {// TODO: this function resets the values of (TBD) reactive/refs above // NOTE: this is for AFTER new playlist creation
  selectedPlaylist.value = null
  showLoifyedTracks.value = false
  showLoifyedPlaylist.value = false
}
</script>

<template>
  <main class="main">

    <FadeTransition>
      <div class="column column-1" v-if="showLoifyedPlaylist">
        <PlaylistPreview :playlistName="selectedPlaylist.name" :imgSrc="selectedPlaylist.image">o r i g i n a l<br />p l a y l i s t</PlaylistPreview>
        <PlaylistPreview :playlistName="loifyedPlaylist.name" :imgSrc="getLoifyedPlaylistImage.data.value" v-if=getLoifyedPlaylistImage.data.value>n e w<br />p l a y l i s t</PlaylistPreview>
        <PlaylistPreviewSkeleton v-else/>

        <div class="icon-container">
          <FontAwesomeIcon :icon="['fab', 'spotify']" @click="openLoifyedPlaylistInSpotify()"  class="icon spotify"/>
          <FontAwesomeIcon :icon="['fas', 'arrow-rotate-left']" @click="reset()" class="icon restart"/>
          <router-link to="/logout"><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon" /></router-link>
        </div>
      </div>


      <div :class="`column column-1 ${playlistsDataQuery.isFetching.value ? 'skeleton' : ''}`" v-else>
        <div class="heading-container">
          <router-link to="/logout"><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon logout" /></router-link>
          <h2 class="col-heading">P l a y l i s t s</h2>
        </div>
        
        <div class="outer">
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
      </div>
    </FadeTransition>
    
    
    <div :class="`column column-2 ${tracksDataQuery.isFetching.value ? 'skeleton': ''}`">
      <div class="heading-container">
        <FontAwesomeIcon :icon="['fas', 'caret-left']" class="icon back-arrow" @click="deselectPlaylist()" v-if="selectedPlaylist"/>
        <h2 class="col-heading">S o n g s</h2>
      </div>
      <FadeTransition>
        <div class="outer">
          <template v-if="!selectedPlaylist"></template>
          <template v-else-if="tracksDataQuery.isFetching.value">
            <ItemSkeleton v-for="index in 20" :key="index" />
          </template>
          <template v-else>
            <TrackItem v-for="item in tracksDataQuery.data.value" :key="item.id" :trackName="item.name" :artistName="item.artist" :imgSrc="item.image"/>
          </template>
        </div>
      </FadeTransition>
    </div>
    
    
    
    <div :class="`column column-3 item-container ${loifyedTracksDataQuery.isFetching.value ? 'skeleton': ''}`">
      <FadeTransition>
        <div v-if="!showLoifyedTracks && !selectedPlaylist" />
        
        <div class="heading-container" v-else-if="selectedPlaylist && !showLoifyedTracks">
          <h2 class="col-heading">L o i f y</h2>
          <ThemeButton @click="toggleOnShowLoifyedTracks()" class="loify-button">
            g e n e r a t e
          </ThemeButton>
        </div>
      
        <div class="outer" v-else>
          <div class="heading-container">
            <h2 class="col-heading">L o i f y</h2>
            <ThemeButton @click="toggleOnShowLoifyedPlaylist(); createPlaylistMutation.mutate()" class="add-button" v-show="!showLoifyedPlaylist">
              add playlist to spotify
            </ThemeButton>
          </div>
          <template v-if="showLoifyedTracks && loifyedTracksDataQuery.isFetching.value">
            <ItemSkeleton v-for="index in 20" :key="index" />
          </template>
          <template v-else-if="showLoifyedTracks && loifyedTracksDataQuery.data.value">
            <TrackItem v-for="item in loifyedTracksDataQuery.data.value" :key="item.id" :trackName="item.name" :artistName="item.artist" :imgSrc="item.image"/>
          </template>
        </div>
      </FadeTransition>
    </div>

  </main>
</template>

<style scoped>

.outer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.main {
  display: flex;
  height: 100vh;
  overflow: auto;
  flex: 1;
  padding: 2rem;
  gap: 2rem;
}
.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1rem;
  overflow: auto;
  padding-top: 3rem;
  background-color: #AEAED0;
  border-radius: 0.5rem;
}

.col-heading {
  font-family: 'night-pumpkind', sans-serif;
  color: #000000;
  font-size: 2rem;

  position: absolute;
  left:50%;
  transform: translateX(-50%);

  white-space: nowrap;
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

.column::-webkit-scrollbar {
  width: 1.7rem;
}

.column::-webkit-scrollbar-track {
  margin-top: 5rem;
  margin-bottom: 1rem;

}

.column::-webkit-scrollbar-thumb {
  background-color: #847F95;
  border-radius: 1rem;
  box-shadow: inset 0 0 10px 10px #847F95;
  border: solid 0.5rem #AEAED0;
}

.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.icon {
  color: #847F95;
  cursor: pointer;
}

.icon.logout {
  font-size: 1.75rem;
}

.icon.back-arrow {
  font-size: 2.5rem;
}

.icon-container {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;
}

.loify-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 750%);
}

.add-button {
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -140%);
}

</style>
