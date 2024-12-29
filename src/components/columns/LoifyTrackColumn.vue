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

import SpotifyLogo from '../../../public/images/spotify-logo-official.svg'

const playlistState: any = inject('playlistState')
if (!playlistState) throw new Error('Playlist state not found')

const { selectedPlaylist, selectedGenre, queries, actions, toggles } = playlistState

const canGenerateLoifyTracks = computed(
  () => selectedPlaylist.value && queries.tracksQuery.data.value && !toggles.loifyTracksToggle.isToggled.value
)
const shouldShowLoifyBackArrow = computed(
  () =>
    selectedPlaylist.value && !toggles.loifyPlaylistToggle.isToggled.value && toggles.loifyTracksToggle.isToggled.value
)
const shouldShowAddToSpotify = computed(
  () =>
    selectedPlaylist.value &&
    toggles.loifyTracksToggle.isToggled.value &&
    !queries.loifyTracksQuery.isFetching.value &&
    !toggles.loifyPlaylistToggle.isToggled.value
)
const shouldShowLoifyColumnEmpty = computed(() => !toggles.loifyTracksToggle.isToggled.value && !selectedPlaylist.value)
const shouldShowLoifyColumnSkeleton = computed(
  () => queries.loifyTracksQuery.isFetching.value && toggles.loifyTracksToggle.isToggled.value
)
const shouldShowLoifyColumnItems = computed(() => selectedPlaylist.value && toggles.loifyTracksToggle.isToggled.value)
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
      <ThemeButton @click="actions.fetchLoifyTracks" class="loify-button" v-if="canGenerateLoifyTracks">
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
        :imgSrc="item.image?.url"
        :explicit="item.explicit"
        :url="item.url"
      />
    </template>
    <template #header-icon-2>
      <FontAwesomeIcon
        v-tooltip.top-end="'add playlist to spotify!'"
        :icon="['fas', 'download']"
        class="icon download"
        @click="actions.createPlaylist"
        v-if="shouldShowAddToSpotify"
      />
    </template>
    <template #always>
      <div class="spotify-attribution">
        <h1 class="loify-logo">loify</h1>
        <p class="spotify-attribution-text">a playlist creator for</p>
        <SpotifyLogo class="spotify-logo" />
      </div>
      <RouterLink to="/">
        <FontAwesomeIcon :icon="['fas', 'house']" class="icon house" />
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

.icon.download {
  font-size: 1.5rem;
}

.icon.house {
  font-size: 1.25rem;
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
}

.multiselect {
  font-family: var(--font-family-secondary);
}

.spotify-attribution {
  margin-top: auto;
  font-family: var(--font-family-primary);
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  flex-direction: column;
  color: #615d59;
  transform: translateY(3rem);
}

.spotify-attribution-text {
  font-size: 1.5rem;
  text-align: center;
}

.spotify-logo {
  height: 3rem;
  width: auto;
}

:deep(.item-container) {
  max-height: calc(100dvh - 29rem);
}

@media (max-width: 1200px) {
  .icon.house {
    font-size: var(--icon-size-lg);
    bottom: 0.5rem;
  }

  :deep(.multiselect *) {
    font-size: var(--font-size-sm);
    overflow-x: hidden;
  }

  :deep(.multiselect__option::after) {
    font-size: var(--font-size-sm);
    transform: translateX(10px);
  }

  .icon.back-arrow,
  .icon.download {
    font-size: var(--font-size-sm);
  }

  .icon.house {
    right: 0.5rem;
  }

  .spotify-attribution {
    font-size: 0.8rem;
    gap: 0.5rem;
  }

  .spotify-attribution-text {
    font-size: 1rem;
    text-align: center;
  }

  .spotify-logo {
    height: 2rem;
    width: auto;
  }

  :deep(.item-container) {
    max-height: calc(100dvh - 20.5rem);
  }
}
</style>
