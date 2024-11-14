import { ref, reactive } from 'vue'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { useToggle } from '@/hooks/useToggle'
import * as api from '@/api'

export function usePlaylist() {
  const toast = useToast()

  const selectedPlaylist = ref(null)
  const loifyPlaylist = reactive({ id: null, name: null, image: null, url: null })

  const deleteModalToggle = useToggle(false)
  const loifyTracksToggle = useToggle(false)
  const loifyPlaylistToggle = useToggle(false)

  console.log(deleteModalToggle.state.value)

  const deselectPlaylist = () => (selectedPlaylist.value = null)
  const selectPlaylist = (e) => {
    e.target.id === selectedPlaylist.value?.id
      ? deselectPlaylist()
      : (selectedPlaylist.value = playlists.data.value.find((p) => p.id === e.target.id) || null)
  }

  function reset() {
    deselectPlaylist()
    loifyTracksToggle.toggle()
    loifyPlaylistToggle.toggle()

    loifyPlaylist.id = null
    loifyPlaylist.name = null
    loifyPlaylist.image = null
    loifyPlaylist.url = null
  }

  const playlists = useQuery({
    queryKey: ['playlistData'],
    queryFn: () => api.fetchPlaylists()
  })

  const tracks = useQuery({
    queryKey: ['tracksData', selectedPlaylist],
    queryFn: () => api.fetchTracks(selectedPlaylist.value.id),
  })

  const loifyTracks = useQuery({
    queryKey: ['loifyTracksData', selectedPlaylist],
    queryFn: () => api.fetchLoifyTracks(selectedPlaylist.value.id),
    enabled: false  // TODO: do i need this when selectedPlaylist is in the queryKey?
  })

  const createPlaylist = useMutation({
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

  const loifyPlaylistImage = useQuery({
    queryKey: ['playlistImage', loifyPlaylist.id],
    queryFn: () => api.fetchPlaylistImage(loifyPlaylist.id),
    enabled: false
  })

  return {
    // state:
    selectedPlaylist,
    loifyPlaylist,

    actions: {
      selectPlaylist,
      deselectPlaylist,
      createPlaylist: createPlaylist.mutate,
      reset
    },
    queries: {
      playlists,
      tracks,
      loifyTracks,
      loifyPlaylistImage
    },
    toggles: {
      deleteModalToggle,
      loifyTracksToggle,
      loifyPlaylistToggle
    }
  }
}
