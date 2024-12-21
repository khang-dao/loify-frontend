import { useQuery, useMutation } from '@tanstack/vue-query'
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

import { deletePlaylist, deleteAllPlaylists } from '@/api'
import * as api from '@/api'
import { useToggle } from '@/hooks/useToggle'
import { Genre } from '@/types/genre'
import type { Playlist } from '@/types/playlist'
import { customSort } from '@/utils/string'

const toast = useToast()

export function usePlaylist() {
  // Reactive State
  const selectedGenre = ref<Genre | undefined>(Genre.LOFI)
  const selectedPlaylist = ref<Playlist | undefined>(undefined)
  const loifyPlaylist = reactive<Playlist>({
    id: undefined,
    name: undefined,
    image: undefined,
    url: undefined
  })

  // Toggles
  const deleteModalToggle = useToggle(false)
  const loifyTracksToggle = useToggle(false)
  const loifyPlaylistToggle = useToggle(false)

  // Actions
  const deselectPlaylist = () => (selectedPlaylist.value = undefined)
  const selectPlaylist = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target?.id === selectedPlaylist.value?.id) {
      deselectPlaylist()
    } else {
      loifyTracksToggle.toggleOff()
      selectedPlaylist.value =
        playlistsQuery.data.value.find((p: Playlist) => p.id === target.id) || undefined
      tracksQuery.refetch()
    }
  }

  // Queries
  const playlistsQuery = useQuery({
    queryKey: ['playlistData'],
    queryFn: () => api.fetchPlaylists().then((playlists) => customSort(playlists))
  })
  const fetchPlaylists = () => playlistsQuery.refetch()

  const tracksQuery = useQuery({
    queryKey: ['tracksData', selectedPlaylist],
    queryFn: () => api.fetchTracks(selectedPlaylist.value?.id),
    enabled: false
  })
  const fetchTracks = () => tracksQuery.refetch()

  const loifyTracksQuery = useQuery({
    queryKey: ['loifyTracksData', selectedPlaylist],
    queryFn: () => api.fetchLoifyTracks(selectedPlaylist.value?.id, selectedGenre.value),
    enabled: false
  })
  const fetchLoifyTracks = () => {
    if (selectedGenre.value) {
      loifyTracksToggle.toggle()
      loifyTracksQuery.refetch()
    }
  }

  // Mutations
  const createPlaylistMutation = useMutation({
    mutationFn: () => api.createLoifyPlaylist(selectedPlaylist.value!.id, selectedGenre.value),
    onSuccess: (data) => {
      Object.assign(loifyPlaylist, {
        id: data.id,
        name: data.name,
        image: data.images?.[0]?.url || '',
        url: data.external_urls.spotify
      })
      toast('New playlist created! Just fetching data...')
      loifyPlaylistImage.refetch().then((imageUrl) => (loifyPlaylist.image = imageUrl.data))
    },
    onError: (error) => {
      toast(error.message || 'An error occurred while creating the playlist')
    }
  })
  const createPlaylist = () => loifyPlaylistToggle.toggle() && createPlaylistMutation.mutate()

  const loifyPlaylistImage = useQuery({
    queryKey: ['playlistImage', loifyPlaylist.id],
    queryFn: () => api.fetchPlaylistImage(loifyPlaylist.id),
    enabled: false
  })

  // Delete Actions
  const deletePlaylistAndRefetch = async (playlistId: string) =>
    (await deletePlaylist(playlistId)) && playlistsQuery.refetch()
  const deleteAllPlaylistsAndRefetch = async () =>
    (await deleteAllPlaylists()) && playlistsQuery.refetch()

  // Reset State
  const reset = () => {
    deselectPlaylist()
    loifyTracksToggle.toggleOff()
    loifyPlaylistToggle.toggleOff()
    loifyPlaylist.id = undefined
    loifyPlaylist.name = undefined
    loifyPlaylist.image = undefined
    loifyPlaylist.url = undefined
    playlistsQuery.refetch()
  }

  return {
    selectedGenre,
    selectedPlaylist,
    loifyPlaylist,

    actions: {
      selectPlaylist,
      deselectPlaylist,
      fetchPlaylists,
      fetchTracks,
      fetchLoifyTracks,
      createPlaylist,
      reset,
      deletePlaylistAndRefetch,
      deleteAllPlaylistsAndRefetch
    },
    toggles: {
      deleteModalToggle,
      loifyTracksToggle,
      loifyPlaylistToggle
    },
    queries: {
      playlistsQuery,
      tracksQuery,
      loifyTracksQuery
    },
    mutations: {
      createPlaylistMutation
    }
  }
}
