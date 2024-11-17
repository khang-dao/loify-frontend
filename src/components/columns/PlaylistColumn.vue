<script setup lang="ts">
import { inject } from 'vue'
import { addSpacesBetweenChars } from '@/utils/string'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PlaylistItem from '@/components/column-items/PlaylistItem.vue'
import Column from '@/components/columns/Column.vue'

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
</template>

<style scoped>
.icon {
  color: #847f95;
  cursor: pointer;
}

.icon.logout {
  font-size: 1.5rem;
}

.icon.plus {
  font-size: 1.75rem;
}
</style>
