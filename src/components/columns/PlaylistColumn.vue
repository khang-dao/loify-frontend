<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { inject } from 'vue'

import Column from '@/components/columns/Column.vue'
import PlaylistItem from '@/components/columns/items/PlaylistItem.vue'
import { addSpacesBetweenChars } from '@/utils/string'

const playlistState: any = inject('playlistState')
if (!playlistState) throw new Error('Playlist state not found')

const { selectedPlaylist, queries, actions, toggles } = playlistState
</script>

<template>
  <Column
    :colName="`${addSpacesBetweenChars('playlists')}`"
    :skeletonCondition="queries.playlistsQuery.isFetching.value"
    :displayCondition="queries.playlistsQuery.data.value"
  >
    <template #header-icon>
      <router-link to="/logout"><FontAwesomeIcon :icon="['fas', 'power-off']" class="icon logout" /></router-link>
    </template>
    <template #main-content>
      <PlaylistItem
        v-for="item in queries.playlistsQuery.data.value"
        @click="actions.selectPlaylist"
        :selected="selectedPlaylist?.id === item.id"
        :playlistId="item.id"
        :key="item.id"
        :playlistName="item.name"
        :imgSrc="item.image?.url"
        :url="item?.url"
        :handleDelete="actions.deletePlaylistAndRefetch"
      />
    </template>
    <template #header-icon-2>
      <FontAwesomeIcon
        v-tooltip.top-end="'delete loify playlists'"
        :icon="['fas', 'trash']"
        @click="toggles.deleteModalToggle.toggle"
        class="icon trash"
        v-if="!queries.playlistsQuery.isFetching.value"
      />
    </template>
    <template #always>
      <FontAwesomeIcon
        v-tooltip.top-end="'refresh playlists'"
        :icon="['fas', 'arrow-rotate-left']"
        @click="queries.playlistsQuery.refetch"
        class="icon back-arrow"
        v-if="!queries.playlistsQuery.isFetching.value"
      />
    </template>
  </Column>
</template>

<style scoped>
.icon {
  color: #847f95;
  cursor: pointer;
}

.icon.logout,
.icon.trash {
  font-size: 1.5rem;
}

.icon.back-arrow {
  font-size: 1.25rem;
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
}

@media (max-width: 1200px) {
  .icon.logout,
  .icon.trash {
    font-size: 1rem;
  }

  .icon.back-arrow {
    font-size: 1rem;
    bottom: 0.5rem;
    right: 0.5rem;
  }
}

@media (max-width: 768px) {
  .icon.logout,
  .icon.trash {
    font-size: 0.7rem;
  }

  .icon.back-arrow {
    font-size: 0.7rem;
  }
}
</style>
