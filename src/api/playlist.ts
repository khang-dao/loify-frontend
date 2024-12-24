import client from '@/api/client'
import { Genre, Playlist } from '@/types'

/**
 * Creates a Loify playlist based on the specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @param {Genre} [genre] - The genre for the playlist (defaults to LOFI).
 * @returns {Promise<Playlist | undefined>} The created playlist object or undefined if failed.
 */
export async function createLoifyPlaylist(
  playlistId?: string,
  genre: Genre = Genre.LOFI
): Promise<Playlist | undefined> {
  if (!playlistId) {
    console.error('Playlist ID cannot be null or undefined.')
    return
  }

  try {
    const response = await client.post(
      `/playlists/${playlistId}/loify?genre=${genre}`
    )
    return response.data
  } catch (error) {
    console.error(`Failed to create Loify playlist: ${error}`)
    throw error
  }
}

/**
 * Deletes a playlist by its ID.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Promise<string | undefined>} The Axios delete request response or undefined.
 */
export async function deletePlaylist(playlistId: string): Promise<string | undefined> {
  if (!playlistId) {
    console.error('Playlist ID cannot be null or undefined.')
    return
  }
  try {
    const response = await client.delete(`/me/playlists/${playlistId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete playlist: ${error}`)
    throw error
  }
}

/**
 * Deletes all user-associated playlists.
 * @returns {Promise<string | undefined>} The Axios delete request response or undefined.
 */
export async function deleteAllPlaylists(): Promise<string | undefined> {
  try {
    const response = await client.delete('/me/playlists/loify')
    return response.data
  } catch (error) {
    console.error(`Failed to delete all playlists: ${error}`)
    throw error
  }
}

/**
 * Fetches all playlists for the user.
 * @returns {Promise<Playlist[]>} A list of playlist objects with id, name, and image.
 */
export async function fetchPlaylists(): Promise<Playlist[]> {
  try {
    const response = await client.get('/me/playlists')
    return response.data.items
      .map((item: Playlist) => item
        ? {
          id: item.id,
          name: item.name,
          image: item?.image
        }
        : null
      )
      .filter((item: Playlist) => item !== null)
  } catch (error) {
    console.error(`Failed to fetch playlists: ${error}`)
    throw error
  }
}

/**
 * Fetches the image for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Promise<string | undefined>} The URL of the playlist image or undefined if failed.
 */
export async function fetchPlaylistImage(playlistId: string): Promise<string | undefined> {
  if (!playlistId) {
    console.error('Playlist ID cannot be null or undefined.')
    return
  }

  try {
    const response = await client.get(`/playlists/${playlistId}`)
    return response.data.image
  } catch (error) {
    console.error(`Failed to fetch playlist image: ${error}`)
    throw error
  }
}
