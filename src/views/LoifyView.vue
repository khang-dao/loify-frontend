<script setup lang="ts">
import PlaylistPreview from '@/components/PlaylistPreview.vue'
import PlaylistPreviewSkeleton from '@/components/skeletons/PlaylistPreviewSkeleton.vue'
import PlaylistItem from '@/components/PlaylistItem.vue'
import TrackItem from '@/components/TrackItem.vue'
import ThemeButton from '@/components/buttons/ThemeButton.vue'
import Column from '@/components/Column.vue'
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { usePlaylist } from '@/hooks/usePlaylist'
import { openUrlInNewTab } from '@/utils/browser'
import { addSpacesBetweenChars } from '@/utils/string'

import MultiSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { Genre } from '@/types/genre'
import { computed } from 'vue'

const { selectedGenre, selectedPlaylist, loifyPlaylist, actions, queries, toggles } = usePlaylist()

const handleDeleteConfirm = () => {
  toggles.deleteModalToggle.toggle();
  actions.deleteAllPlaylistsAndRefetch();
};

const canGenerateLoifyTracks = computed(
  () => selectedPlaylist && queries.tracksQuery.data.value && !toggles.loifyTracksToggle.state.value
)

const shouldShowTracksBackArrow = computed(
  () => selectedPlaylist && !toggles.loifyPlaylistToggle.state.value
)
const shouldShowLoifyBackArrow = computed(
  () =>
    selectedPlaylist &&
    !toggles.loifyPlaylistToggle.state.value &&
    toggles.loifyTracksToggle.state.value
)
const shouldShowAddToSpotify = computed(
  () =>
    selectedPlaylist &&
    toggles.loifyTracksToggle.state.value &&
    !queries.loifyTracksQuery.isFetching.value &&
    !toggles.loifyPlaylistToggle.state.value
)

const shouldShowLoifyColumnEmpty = computed(() => 
  !toggles.loifyTracksToggle.state.value && !selectedPlaylist
);

const shouldShowLoifyColumnSkeleton = computed(() => 
  queries.loifyTracksQuery.isFetching.value && toggles.loifyTracksToggle.state.value
);

const shouldShowLoifyColumnItems = computed(() => 
  selectedPlaylist && toggles.loifyTracksToggle.state.value
);
</script>

<template>
  <main class="main">
    <DeleteConfirmationModal
      v-show="toggles.deleteModalToggle.state.value"
      message="Are you sure you want to delete all loify playlists?"
      :onConfirmDelete="handleDeleteConfirm"
      :onCancelDelete="toggles.deleteModalToggle.toggle"
    />

    <!-- Original and Loify Playlist Previews -->
    <div class="column col-1" v-if="toggles.loifyPlaylistToggle.state.value">
      <PlaylistPreview :playlistName="selectedPlaylist?.name" :imgSrc="selectedPlaylist?.image"
        >o r i g i n a l<br />p l a y l i s t</PlaylistPreview
      >
      <PlaylistPreview
        @click="openUrlInNewTab(loifyPlaylist.url)"
        :playlistName="loifyPlaylist.name"
        :imgSrc="loifyPlaylist.image"
        v-if="loifyPlaylist.image"
        >n e w<br />p l a y l i s t</PlaylistPreview
      >
      <PlaylistPreviewSkeleton v-else />

      <div class="icon-container">
        <FontAwesomeIcon
          :icon="['fab', 'spotify']"
          @click="openUrlInNewTab(loifyPlaylist.url)"
          class="icon spotify"
          v-show="loifyPlaylist.image"
        />
        <FontAwesomeIcon
          :icon="['fas', 'arrow-rotate-left']"
          @click="actions.reset"
          class="icon restart"
        />
        <router-link to="/logout"
          ><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon"
        /></router-link>
      </div>
    </div>

    <!-- Playlists Column -->
    <Column
      :colName="`${addSpacesBetweenChars('playlists')}`"
      :skeletonCondition="queries.playlistsQuery.isFetching.value"
      :displayCondition="queries.playlistsQuery.data.value"
      v-else
    >
      <template #header-icon>
        <router-link to="/logout"
          ><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon logout"
        /></router-link>
      </template>
      <template #main-content>
        <PlaylistItem
          v-for="item in queries.playlistsQuery.data.value"
          @click="actions.selectPlaylist"
          :selected="selectedPlaylist?.id === item.id"
          :playlistId="item.id"
          :key="item.id"
          :playlistName="item.name"
          :imgSrc="item.image"
          :handleDelete="actions.deletePlaylistAndRefetch"
        />
      </template>
      <template #header-icon-2>
        <FontAwesomeIcon
          v-tooltip.top-end="'delete loify playlists'"
          :icon="['fas', 'trash']"
          @click="toggles.deleteModalToggle.toggle"
          class="icon logout"
          v-if="queries.playlistsQuery.data.value"
        />
      </template>
    </Column>

    <!-- Songs Column -->
    <Column
      :colName="`${addSpacesBetweenChars('songs')}`"
      :emptyCondition="!selectedPlaylist"
      :skeletonCondition="queries.tracksQuery.isFetching.value"
      :displayCondition="queries.tracksQuery.data.value"
    >
      <template #header-icon>
        <FontAwesomeIcon
          :icon="['fas', 'caret-left']"
          class="icon back-arrow"
          @click="actions.deselectPlaylist"
          v-if="shouldShowTracksBackArrow"
        />
      </template>
      <template #main-content>
        <TrackItem
          v-for="item in queries.tracksQuery.data.value"
          :key="item.id"
          :trackName="item.name"
          :artistName="item.artist"
          :imgSrc="item.image"
        />
      </template>
    </Column>

    <!-- Loify Column -->
    <Column
      :colName="`${selectedGenre ? addSpacesBetweenChars('loify') + ` (${selectedGenre})` : addSpacesBetweenChars('loify')}`"
      :emptyCondition="shouldShowLoifyColumnEmpty"
      :skeletonCondition="shouldShowLoifyColumnSkeleton"
      :displayCondition="shouldShowLoifyColumnItems"
    >
      <template #extra>
        <MultiSelect
          v-model="selectedGenre"
          :options="Object.values(Genre)"
          placeholder="Select an genre"
          v-if="canGenerateLoifyTracks"
        />
        <ThemeButton
          @click="actions.fetchLoifyTracks"
          class="loify-button"
          v-if="canGenerateLoifyTracks"
        >
          g e n e r a t e
        </ThemeButton>
      </template>
      <template #header-icon>
        <FontAwesomeIcon
          :icon="['fas', 'caret-left']"
          class="icon back-arrow"
          @click="toggles.loifyTracksToggle.toggleOff"
          v-if="shouldShowLoifyBackArrow"
        />
      </template>
      <template #main-content>
        <TrackItem
          v-for="item in queries.loifyTracksQuery.data.value"
          :key="item.id"
          :trackName="item.name"
          :artistName="item.artist"
          :imgSrc="item.image"
        />
      </template>
      <template #header-icon-2>
        <FontAwesomeIcon
          v-tooltip.top-start="'add playlist to spotify!'"
          :icon="['fas', 'plus']"
          class="icon plus"
          @click="actions.createPlaylist"
          v-if="shouldShowAddToSpotify"
        />
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
  color: #847f95;
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

.multiselect {
  font-family: 'League Spartan', sans-serif;
}
</style>
