<script setup lang="ts">
import PlaylistPreview from '@/components/PlaylistPreview.vue'
import PlaylistPreviewSkeleton from '@/components/skeletons/PlaylistPreviewSkeleton.vue'
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'
import ThemeButton from '@/components/buttons/ThemeButton.vue'
import Column from '@/components/Column.vue'
import { useToast } from "vue-toastification";
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal.vue'
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



const showDeleteModal = ref(false)
function toggleDeleteModal() {
  showDeleteModal.value = !showDeleteModal.value
}

async function deleteAllPlaylists() {
    // Remove this logic out later
    toggleDeleteModal()
   
    const url = "http://localhost:8080/api/v1/me/playlists/loify"
    await axios.delete(url, { withCredentials: true })

}



const toast = useToast();

const selectedPlaylist = ref(null)
const selectPlaylist = (e) => {
  if (e.target.id === selectedPlaylist.value?.id) {
    deselectPlaylist()
  }
  else {
    toggleOffShowLoifyedTracks()
    const selectedId = e.target.id
    selectedPlaylist.value = playlistsDataQuery.data.value.find((p) => p.id === selectedId) || null
  }
}

const deselectPlaylist = () => {
  toggleOffShowLoifyedTracks()
  selectedPlaylist.value = null
}

const playlistsDataQuery = useQuery({
  queryKey: ['playlistData'],
  queryFn: async () => {
    const url = 'http://localhost:8080/api/v1/me/playlists'
    const response = await axios.get(url, { withCredentials: true })
    const playlistsData = response.data.items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.images?.[0].url
    }))
    
    return playlistsData
  },
})

const tracksDataQuery = useQuery({
  queryKey: ['tracksData', selectedPlaylist],
  queryFn: async () => {
    const url = `http://localhost:8080/api/v1/playlists/${selectedPlaylist.value.id}/tracks`
    const response = await axios.get(url, { withCredentials: true })
    const tracksData = response.data.items.map((item) => ({
      id: item.track?.id,
      name: item.track?.name,
      artist: item.track?.artists?.[0].name,
      image: item.track?.album.images?.[0].url
    }))
    
    return tracksData
  },  
})

const loifyedTracksDataQuery = useQuery({
  queryKey: ['loifyedTracksData', selectedPlaylist],
  queryFn: async () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const url = `http://localhost:8080/api/v1/playlists/${selectedPlaylist.value.id}/loify?genre=lofi`
        const response = await axios.get(url, { withCredentials: true })
        const loifyedTracksData = response.data
          .filter(item => item?.tracks?.items?.[0]?.id)
          .map((item) => ({
            id: item?.tracks?.items?.[0]?.id,
            name: item?.tracks?.items?.[0]?.name,
            artist: item?.tracks?.items?.[0]?.artists?.[0]?.name,
            image: item?.tracks?.items?.[0]?.album?.images?.[0]?.url
        }))
        
        resolve(loifyedTracksData)  // Resolve after delay
      }, 3000) // Delay by 3 seconds
    })
  },
  enabled: false
})

const showLoifyedTracks = ref(false)
function toggleOnShowLoifyedTracks() {
  if (selectedPlaylist.value) {
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
      const url = `http://localhost:8080/api/v1/playlists/${selectedPlaylist.value.id}/loify?genre=lofi`;
      const response = await axios.post(url, { withCredentials: true });
      return response.data;
    },
    onSuccess: async (data) => {
      // On success, update the reactive loifyedPlaylist object
      loifyedPlaylist.id = data.id;
      loifyedPlaylist.name = data.name;
      loifyedPlaylist.image = data.images?.[0]?.url || '';
      loifyedPlaylist.url = data.external_urls.spotify;
      toast("New playlist created! Just fetching data...")
      getLoifyedPlaylistImage.refetch()
    },
  }
);

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
  queryKey: ['playlistImage', loifyedPlaylist.id],
  queryFn: async () => {
    const url = `http://localhost:8080/api/v1/playlists/${loifyedPlaylist.id}`;
    const response = await axios.get(url, { withCredentials: true });
    loifyedPlaylist.image = response.data.images[0].url;
    return response.data.images[0].url;
  },
  enabled: false  // Only fetch on command
});


function openLoifyedPlaylistInSpotify() {
  window.open(loifyedPlaylist.url, '_blank') // Opens the URL in a new tabz
}

// NOTE: This is only temporary, refactor this to import hooks
const { createPlaylistMutation } = useCreateLoifyedPlaylist()

function resetLoifyPlaylist() {
  loifyedPlaylist.id = ''
  loifyedPlaylist.name = ''
  loifyedPlaylist.image = ''
  loifyedPlaylist.url = ''
}

function reset() {// TODO: this function resets the values of (TBD) reactive/refs above // NOTE: this is for AFTER new playlist creation
  selectedPlaylist.value = null
  showLoifyedTracks.value = false
  showLoifyedPlaylist.value = false
  console.log("RESET (BEFORE): ", loifyedPlaylist)
  resetLoifyPlaylist()
  console.log("RESET (AFTER): ", loifyedPlaylist)
}

function logValues() {
  console.log("ADD PLAYLIST: ", loifyedPlaylist)
}
</script>

<template>
  <main class="main">
    <DeleteConfirmationModal message="Are you sure you want to delete all loify playlists?" :visible="showDeleteModal" :onConfirmDelete="deleteAllPlaylists" :onCancelDelete="toggleDeleteModal" />

    <!-- Original and Loifyed Playlist Previews -->
    <div class="column col-1" v-if="showLoifyedPlaylist">
      <PlaylistPreview :playlistName="selectedPlaylist.name" :imgSrc="selectedPlaylist.image">o r i g i n a l<br />p l a y l i s t</PlaylistPreview>
      <PlaylistPreview @click="openLoifyedPlaylistInSpotify()" :playlistName="loifyedPlaylist.name" :imgSrc="getLoifyedPlaylistImage.data.value" v-if="loifyedPlaylist.image">n e w<br />p l a y l i s t</PlaylistPreview>
      <PlaylistPreviewSkeleton v-else/>

      <div class="icon-container">
        <FontAwesomeIcon :icon="['fab', 'spotify']" @click="openLoifyedPlaylistInSpotify()"  class="icon spotify" v-show="loifyedPlaylist.image"/>
        <FontAwesomeIcon :icon="['fas', 'arrow-rotate-left']" @click="reset()" class="icon restart"/>
        <router-link to="/logout"><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon" /></router-link>
      </div>
    </div>

    <!-- Playlists Column -->
    <Column colName="p l a y l i s t s" :skeletonCondition="playlistsDataQuery.isFetching.value" :displayCondition="playlistsDataQuery.data.value" v-else>
      <template #header-icon>
        <router-link to="/logout"><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon logout" /></router-link>
      </template>
      <template #main-content>
        <PlaylistItem v-for="item in playlistsDataQuery.data.value" @click="selectPlaylist" :selected="selectedPlaylist?.id === item.id" :playlistId="item.id" :key="item.id" :playlistName="item.name" :imgSrc="item.image"/>
      </template>
      <template #header-icon-2> <!-- TODO: v-if -->
        <FontAwesomeIcon v-tooltip.top-end="'delete loify playlists'" :icon="['fas', 'trash']"  @click="toggleDeleteModal" class="icon logout" v-if="playlistsDataQuery.data.value"/>
      </template>
    </Column>

    <!-- Songs Column -->
    <Column colName="s o n g s" :emptyCondition="!selectedPlaylist" :skeletonCondition="tracksDataQuery.isFetching.value" :displayCondition="tracksDataQuery.data.value">
      <template #header-icon>
        <FontAwesomeIcon :icon="['fas', 'caret-left']" class="icon back-arrow" @click="deselectPlaylist()" v-if="selectedPlaylist && !showLoifyedPlaylist"/>
      </template>
      <template #main-content>
        <TrackItem v-for="item in tracksDataQuery.data.value" :key="item.id" :trackName="item.name" :artistName="item.artist" :imgSrc="item.image"/>
      </template>
    </Column>
    
    <!-- Loify Column -->
    <Column colName="l o i f y" :emptyCondition="!showLoifyedTracks && !selectedPlaylist" :skeletonCondition="loifyedTracksDataQuery.isFetching.value && showLoifyedTracks" :displayCondition="!!selectedPlaylist && showLoifyedTracks">
      <template #extra>
        <ThemeButton @click="toggleOnShowLoifyedTracks(); console.log('Before:: ',loifyedTracksDataQuery.value); loifyedTracksDataQuery.refetch(); console.log('After:: ',loifyedTracksDataQuery.value)" class="loify-button" v-if="selectedPlaylist && tracksDataQuery.data.value && !showLoifyedTracks">
          g e n e r a t e
        </ThemeButton>
      </template>
      <template #header-icon>
        <FontAwesomeIcon v-tooltip.top-start="'add playlist to spotify!'" :icon="['fas', 'plus']" class="icon plus" @click="toggleOnShowLoifyedPlaylist(); createPlaylistMutation.mutate(); logValues()" v-if="selectedPlaylist && showLoifyedTracks && loifyedTracksDataQuery.data.value && !showLoifyedPlaylist"/>
      </template>
      <template #main-content>
        <TrackItem v-for="item in loifyedTracksDataQuery.data.value" :key="item.id" :trackName="item.name" :artistName="item.artist" :imgSrc="item.image"/>
      </template>
    </Column>

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

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1.5rem;
  padding-top: 3rem;
  background-color: #aeaed0;
  border-radius: 0.5rem;
  overflow: auto;
}

.icon-container {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;
}

.icon {
  color: #847F95;
  cursor: pointer;
}

.icon.logout {
  font-size: 1.5rem;
}

.icon.back-arrow {
  font-size: 1.75rem;
}

.icon.plus {
  font-size: 1.75rem;
}
</style>
