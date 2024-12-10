<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, inject } from 'vue'
import MultiSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import ThemeButton from '@/components/buttons/ThemeButton.vue'
import Column from '@/components/columns/Column.vue'
import TrackItem from '@/components/columns/items/TrackItem.vue'
import { Genre } from '@/types/genre'
import { addSpacesBetweenChars } from '@/utils/string'

const playlistState: any = inject('playlistState')
if (!playlistState) throw new Error('Playlist state not found')

const { selectedPlaylist, selectedGenre, queries, actions, toggles } = playlistState

const canGenerateLoifyTracks = computed(
  () =>
    selectedPlaylist.value &&
    queries.tracksQuery.data.value &&
    !toggles.loifyTracksToggle.state.value
)
const shouldShowLoifyBackArrow = computed(
  () =>
    selectedPlaylist.value &&
    !toggles.loifyPlaylistToggle.state.value &&
    toggles.loifyTracksToggle.state.value
)
const shouldShowAddToSpotify = computed(
  () =>
    selectedPlaylist.value &&
    toggles.loifyTracksToggle.state.value &&
    !queries.loifyTracksQuery.isFetching.value &&
    !toggles.loifyPlaylistToggle.state.value
)
const shouldShowLoifyColumnEmpty = computed(
  () => !toggles.loifyTracksToggle.state.value && !selectedPlaylist.value
)
const shouldShowLoifyColumnSkeleton = computed(
  () => queries.loifyTracksQuery.isFetching.value && toggles.loifyTracksToggle.state.value
)
const shouldShowLoifyColumnItems = computed(
  () => selectedPlaylist.value && toggles.loifyTracksToggle.state.value
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
        placeholder="Select a genre"
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
    <template #always>
      <RouterLink to="/">
        <FontAwesomeIcon
          :icon="['fas', 'house']"
          class="icon house"
        />
      </RouterLink>
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

.icon.house {
  font-size: 1.25rem;
  position: absolute;
  bottom: 1.75rem;
  right: 2.5rem;
}

.multiselect {
  font-family: 'league-spartan', sans-serif;
}
</style>
