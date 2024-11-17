<script setup lang="ts">
import TrackItem from '@/components/columns/items/TrackItem.vue'
import Column from '@/components/columns/Column.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { addSpacesBetweenChars } from '@/utils/string'

import 'vue-multiselect/dist/vue-multiselect.min.css'
import { computed, inject } from 'vue'

const playlistState: any = inject('playlistState')
if (!playlistState) throw new Error('Playlist state not found')

const { selectedPlaylist, queries, actions, toggles } = playlistState

const shouldShowTracksBackArrow = computed(
  () => selectedPlaylist && !toggles.loifyPlaylistToggle.state.value
)
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
</template>

<style scoped>
.icon {
  color: #847f95;
  cursor: pointer;
}

.icon.back-arrow {
  font-size: 1.75rem;
}
</style>
