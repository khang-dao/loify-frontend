import { ref, reactive } from 'vue'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { useToggle } from '@/hooks/useToggle'
import { deletePlaylist, deleteAllPlaylists } from '@/api'
import * as api from '@/api'

export function usePlaylist() {
  const toast = useToast()

  const selectedPlaylist = ref(null)
  const loifyPlaylist = reactive({ id: null, name: null, image: null, url: null })

  const deleteModalToggle = useToggle(false)
  const loifyTracksToggle = useToggle(false)
  const loifyPlaylistToggle = useToggle(false)

  const deselectPlaylist = () => (selectedPlaylist.value = null)
  const selectPlaylist = (e) => {
    if (e.target.id === selectedPlaylist.value?.id) {
      deselectPlaylist();
    } else {
      selectedPlaylist.value = playlistsQuery.data.value.find((p) => p.id === e.target.id) || null;
    }
  }

  const playlistsQuery = useQuery({
    queryKey: ['playlistData'],
    queryFn: () => api.fetchPlaylists()
  })
  const fetchPlaylists = () => playlistsQuery.refetch()

  const tracksQuery = useQuery({
    queryKey: ['tracksData', selectedPlaylist],
    queryFn: () => api.fetchTracks(selectedPlaylist.value.id),
  })
  const fetchTracks = () => tracksQuery.refetch()

  const loifyTracksQuery = useQuery({
    queryKey: ['loifyTracksData', selectedPlaylist],
    queryFn: () => api.fetchLoifyTracks(selectedPlaylist.value.id),
    enabled: false  // TODO: do i need this when selectedPlaylist is in the queryKey?
  })
  const fetchLoifyTracks = () => loifyTracksToggle.toggle() && loifyTracksQuery.refetch();

  const createPlaylistMutation = useMutation({
    mutationFn: () => api.createLoifyPlaylist(selectedPlaylist.value.id),
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

  const deletePlaylistAndRefetch = async (playlistId) => await deletePlaylist(playlistId) && playlistsQuery.refetch()
  const deleteAllPlaylistsAndRefetch = async () => await deleteAllPlaylists() && playlistsQuery.refetch()

  const reset = () => {
    deselectPlaylist()
    loifyTracksToggle.toggle()
    loifyPlaylistToggle.toggle()

    loifyPlaylist.id = null
    loifyPlaylist.name = null
    loifyPlaylist.image = null
    loifyPlaylist.url = null
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
