import client from '@/api/client'
import { Genre } from '@/types/genre'

// TODO: Create interface for `item` and replace all `item: any` refs

/**
 * Fetches tracks for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Array} List of track objects with id, name, artist, and image.
 */
export async function fetchTracks(playlistId?: string) {
  try {
    if (!playlistId) {
      throw new Error('Invalid playlist ID. Playlist ID cannot be null or undefined.')
    }
    const response = await client.get(`/playlists/${playlistId}/tracks`)
    return response.data.items.map((item: any) => ({
      id: item.track?.id,
      name: item.track?.name,
      artist: item.track?.artists?.[0].name,
      image: item.track?.album.images?.[0].url
    }))
  } catch (error) {
    console.error(`Failed to fetch tracks: ${error}`)
  }
}

/**
 * Fetches loify tracks for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Array} List of loify track objects.
 */
export async function fetchLoifyTracks(playlistId?: string, genre?: Genre) {
  try {
    if (!playlistId) {
      throw new Error('Invalid playlist ID. Playlist ID cannot be null or undefined.')
    }
    const response = await client.get(`/playlists/${playlistId}/loify?genre=${genre || Genre.LOFI}`)
    return response.data
      .filter((item: any) => item?.tracks?.items?.[0]?.id)
      .map((item: any) => ({
        id: item.tracks.items[0].id,
        name: item.tracks.items[0].name,
        artist: item.tracks.items[0].artists[0].name,
        image: item.tracks.items[0].album.images[0].url
      }))
  } catch (error) {
    console.error(`Failed to fetch loify tracks: ${error}`)
  }
}
