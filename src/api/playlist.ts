import client from '@/api/client'
import { Genre } from '@/types/genre'

// TODO: Create interface for `item` and replace all `item: any` refs

/**
 * Creates a loify playlist based on a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Object} Created playlist object.
 */
export async function createLoifyPlaylist(playlistId?: string, genre?: Genre) {
  try {
    if (!playlistId) {
      throw new Error('Invalid playlist ID. Playlist ID cannot be null or undefined.')
    }
    const response = await client.post(
      `/playlists/${playlistId}/loify?genre=${genre || Genre.LOFI}`
    )
    return response.data
  } catch (error) {
    console.error(`Failed to create loify playlist: ${error}`)
  }
}

/**
 * Deletes playlists by playlistId.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Promise} Axios delete request promise.
 */
export async function deletePlaylist(playlistId?: string) {
  if (!playlistId) {
    console.error(`Invalid playlist ID. Playlist ID cannot be null or undefined: ${error}`)
  }
  try {
    return await client.delete(`/me/playlists/${playlistId}`)
  } catch (error) {
    console.error(`Failed to delete playlists: ${error}`)
  }
}

/**
 * Deletes all playlists associated with the user.
 * @returns {Promise} Axios delete request promise.
 */
export async function deleteAllPlaylists() {
  try {
    return await client.delete('/me/playlists/loify')
  } catch (error) {
    console.error(`Failed to delete playlists: ${error}`)
  }
}

/**
 * Fetches all playlists for the user.
 * @returns {Array} List of playlist objects with id, name, and image.
 */
export async function fetchPlaylists() {
  try {
    const response = await client.get('/me/playlists')
    console.log(response)
    return response.data.items.filter(item => item).map((item: any) => ({
      id: item?.id,
      name: item?.name,
      image: item.images?.[0]?.url
    }))
  } catch (error) {
    console.error(`Failed to fetch playlists: ${error}`)
  }
}

/**
 * Fetches an image for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {string} URL of the playlist image.
 */
export async function fetchPlaylistImage(playlistId?: string) {
  try {
    if (!playlistId) {
      throw new Error('Invalid playlist ID. Playlist ID cannot be null or undefined.')
    }
    const response = await client.get(`/playlists/${playlistId}`)
    return response.data.images[0].url
  } catch (error) {
    console.error(`Failed to fetch playlist image: ${error}`)
  }
}
