import client from '@/api/client'
import { Genre } from '@/types/genre'

// TODO: Replace all `item: any` references with a proper interface.

/**
 * Creates a Loify playlist based on the specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @param {Genre} [genre] - The genre for the playlist (defaults to LOFI).
 * @returns {Object} The created playlist object.
 */
export async function createLoifyPlaylist(playlistId?: string, genre?: Genre) {
  try {
    if (!playlistId) {
      throw new Error('Playlist ID cannot be null or undefined.')
    }
    const response = await client.post(
      `/playlists/${playlistId}/loify?genre=${genre || Genre.LOFI}`
    )
    return response.data
  } catch (error) {
    console.error(`Failed to create Loify playlist: ${error}`)
  }
}

/**
 * Deletes a playlist by its ID.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Promise} The Axios delete request promise.
 */
export async function deletePlaylist(playlistId?: string) {
  if (!playlistId) {
    console.error('Playlist ID cannot be null or undefined.')
    return
  }
  try {
    return await client.delete(`/me/playlists/${playlistId}`)
  } catch (error) {
    console.error(`Failed to delete playlist: ${error}`)
  }
}

/**
 * Deletes all user-associated playlists.
 * @returns {Promise} The Axios delete request promise.
 */
export async function deleteAllPlaylists() {
  try {
    return await client.delete('/me/playlists/loify')
  } catch (error) {
    console.error(`Failed to delete all playlists: ${error}`)
  }
}

/**
 * Fetches all playlists for the user.
 * @returns {Array} A list of playlist objects with id, name, and image.
 */
export async function fetchPlaylists() {
  try {
    const response = await client.get('/me/playlists')
    return response.data.items.filter(item => item).map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.images?.[0]?.url
    }))
  } catch (error) {
    console.error(`Failed to fetch playlists: ${error}`)
  }
}

/**
 * Fetches the image for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {string} The URL of the playlist image.
 */
export async function fetchPlaylistImage(playlistId?: string) {
  try {
    if (!playlistId) {
      throw new Error('Playlist ID cannot be null or undefined.')
    }
    const response = await client.get(`/playlists/${playlistId}`)
    return response.data.images?.[0]?.url
  } catch (error) {
    console.error(`Failed to fetch playlist image: ${error}`)
  }
}
