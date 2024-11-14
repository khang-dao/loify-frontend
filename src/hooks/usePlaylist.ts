import { ref, reactive } from 'vue'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { useToggle } from '@/hooks/useToggle'
import { deletePlaylist, deleteAllPlaylists } from '@/api'
import * as api from '@/api'
import type { Playlist } from '@/types/playlist'

export function usePlaylist() {
  const toast = useToast()

  const selectedPlaylist = ref<Playlist | undefined>(undefined)
  const loifyPlaylist = reactive<Playlist>({ id: undefined, name: undefined, image: undefined, url: undefined })

  const deleteModalToggle = useToggle(false)
  const loifyTracksToggle = useToggle(false)
  const loifyPlaylistToggle = useToggle(false)

  const deselectPlaylist = () => (selectedPlaylist.value = undefined)
  const selectPlaylist = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.id === selectedPlaylist.value?.id) {
      deselectPlaylist();
    } else {
      loifyTracksToggle.toggleOff()
      selectedPlaylist.value = playlistsQuery.data.value.find((p: Playlist) => p.id === target.id) || undefined;
    }
  }

  const playlistsQuery = useQuery({
    queryKey: ['playlistData'],
    queryFn: () => api.fetchPlaylists()
  })
  const fetchPlaylists = () => playlistsQuery.refetch()

  const tracksQuery = useQuery({
    queryKey: ['tracksData', selectedPlaylist],
    queryFn: () => api.fetchTracks(selectedPlaylist.value?.id),
  })
  const fetchTracks = () => tracksQuery.refetch()

  const loifyTracksQuery = useQuery({
    queryKey: ['loifyTracksData', selectedPlaylist],
    queryFn: () => api.fetchLoifyTracks(selectedPlaylist.value?.id),
    enabled: false  // TODO: do i need this when selectedPlaylist is in the queryKey?
  })
  const fetchLoifyTracks = () => loifyTracksToggle.toggle() && loifyTracksQuery.refetch();

  const createPlaylistMutation = useMutation({
    mutationFn: () => api.createLoifyPlaylist(selectedPlaylist.value!.id),
    onSuccess: (data) => {
      Object.assign(loifyPlaylist, {
        id: data.id,
        name: data.name,
        image: data.images?.[0]?.url || '',
        url: data.external_urls.spotify
      })
      toast('New playlist created! Just fetching data...')
      loifyPlaylistImage.refetch()
        .then(imageUrl => loifyPlaylist.image = imageUrl.data)
    },
    onError: (error) => {
      toast(error.message || 'An error occurred while creating the playlist')
    }
  })
  const createPlaylist = () => loifyPlaylistToggle.toggle() && createPlaylistMutation.mutate();

  const loifyPlaylistImage = useQuery({
    queryKey: ['playlistImage', loifyPlaylist.id],
    queryFn: () => api.fetchPlaylistImage(loifyPlaylist.id),
    enabled: false
  })

  const deletePlaylistAndRefetch = async (playlistId: string) => await deletePlaylist(playlistId) && playlistsQuery.refetch()
  const deleteAllPlaylistsAndRefetch = async () => await deleteAllPlaylists() && playlistsQuery.refetch()

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
    // state:
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
      loifyTracksQuery,
    },
    mutations: {
      createPlaylistMutation
    }
  }
}
