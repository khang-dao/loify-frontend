<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, inject } from 'vue'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import Column from '@/components/columns/Column.vue'
import TrackItem from '@/components/columns/items/TrackItem.vue'
import { addSpacesBetweenChars } from '@/utils/string'

const playlistState: any = inject('playlistState')
if (!playlistState) throw new Error('Playlist state not found')

const { selectedPlaylist, queries, actions, toggles } = playlistState

const shouldShowTracksBackArrow = computed(() => selectedPlaylist.value && !toggles.loifyPlaylistToggle.isToggled.value)

function clearPlaylistSelection() {
  actions.deselectPlaylist()
  toggles.loifyTracksToggle.toggleOff()
}
</script>

<template>
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
        @click="clearPlaylistSelection"
        v-if="shouldShowTracksBackArrow"
      />
    </template>
    <template #main-content>
      <TrackItem
        v-for="item in queries.tracksQuery.data.value"
        :key="item.id"
        :trackName="item.name"
        :artistName="item.artist"
        :imgSrc="item.image?.url"
        :explicit="item.explicit"
        :url="item.url"
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

@media (max-width: 1200px) {
  .icon.back-arrow {
    font-size: var(--icon-size-lg);
  }
}
</style>
