import { useQuery } from 'vue-query'
import axios from 'axios'
import { API_ENDPOINTS } from '../constants/api'

export function useFetchLoifyTracks(playlistId) {
  return useQuery({
    queryKey: ['loifyTracksData', playlistId],
    queryFn: async () => {
      const response = await axios.get(API_ENDPOINTS.loifyPlaylist(playlistId), {
        withCredentials: true
      })

      return response.data
        .filter((item) => item?.tracks?.items?.[0]?.id)
        .map((item) => ({
          id: item.tracks.items[0].id,
          name: item.tracks.items[0].name,
          artist: item.tracks.items[0].artists[0].name,
          image: item.tracks.items[0].album.images[0].url
        }))
    },
    enabled: false
  })
}
