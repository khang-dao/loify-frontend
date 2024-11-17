<script setup lang="ts">
import TrackItem from '@/components/column-items/TrackItem.vue'
import ThemeButton from '@/components/buttons/ThemeButton.vue'
import Column from '@/components/columns/Column.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { addSpacesBetweenChars } from '@/utils/string'

import MultiSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { Genre } from '@/types/genre'
import { computed, inject } from 'vue'

const playlistState: any = inject('playlistState')
if (!playlistState) throw new Error('Playlist state not found')

const { selectedPlaylist, selectedGenre, queries, actions, toggles } = playlistState

const canGenerateLoifyTracks = computed(
  () => selectedPlaylist && queries.tracksQuery.data.value && !toggles.loifyTracksToggle.state.value
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
const shouldShowLoifyColumnEmpty = computed(
  () => !toggles.loifyTracksToggle.state.value && !selectedPlaylist
)
const shouldShowLoifyColumnSkeleton = computed(
  () => queries.loifyTracksQuery.isFetching.value && toggles.loifyTracksToggle.state.value
)
const shouldShowLoifyColumnItems = computed(
  () => selectedPlaylist && toggles.loifyTracksToggle.state.value
)
</script>

<template>
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
        v-tooltip.top-end="'add playlist to spotify!'"
        :icon="['fas', 'plus']"
        class="icon plus"
        @click="actions.createPlaylist"
        v-if="shouldShowAddToSpotify"
      />
    </template>
  </Column>
</template>

<style scoped>
.icon {
  color: #847f95;
  cursor: pointer;
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
