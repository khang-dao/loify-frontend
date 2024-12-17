import client from '@/api/client'
import { DEFAULT_IMG_URL } from '@/constants'
import { Artist, Genre, Track } from '@/types'

/**
 * Fetches tracks for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Promise<Track[]>} A list of tracks with id, name, artist, and image URL.
 */
export async function fetchTracks(playlistId?: string): Promise<Track[]> {
  if (!playlistId) {
    throw new Error('Playlist ID is required.')
  }

  try {
    const response = await client.get(`/playlists/${playlistId}/tracks`)
    return response.data.items.map((item: any) => ({
      id: item.track?.id ?? 'unknown',
      name: item.track?.name ?? 'Unknown',
      artist: (item.track?.artists as Artist[] | undefined)?.[0]?.name ?? 'Unknown Artist',
      image: item.track?.album.images?.[0]?.url ?? DEFAULT_IMG_URL
    }))
  } catch (error) {
    console.error(`Failed to fetch tracks: ${error}`)
    throw error
  }
}

/**
 * Fetches loify tracks for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @param {Genre} [genre] - The genre of loify tracks (defaults to LOFI).
 * @returns {Promise<Track[]>} A list of loify tracks with id, name, artist, and image URL.
 */
export async function fetchLoifyTracks(
  playlistId?: string,
  genre: Genre = Genre.LOFI
): Promise<Track[]> {
  if (!playlistId) {
    throw new Error('Playlist ID is required.')
  }

  try {
    const response = await client.get(`/playlists/${playlistId}/loify?genre=${genre}`)
    return response.data
      .filter((item: any) => item?.tracks?.items?.[0]?.id)
      .map((item: any) => ({
        id: item.tracks.items[0].id ?? 'unknown',
        name: item.tracks.items[0].name ?? 'Unknown',
        artist: item.tracks.items[0].artists[0]?.name ?? 'Unknown Artist',
        image: item.tracks.items[0].album.images[0]?.url ?? DEFAULT_IMG_URL
      }))
  } catch (error) {
    console.error(`Failed to fetch loify tracks: ${error}`)
    throw error
  }
}
