import client from '@/api/client';


// TODO: Create interface for `item` and replace all `item: any` refs

/**
 * Creates a loify playlist based on a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Object} Created playlist object.
 */
export async function createLoifyPlaylist(playlistId?: string) { // TODO: make `genre` a param
  if (!playlistId) {
    throw new Error('Invalid playlist ID. Playlist ID cannot be null or undefined.')
  }
  try {
    const response = await client.post(`/playlists/${playlistId}/loify?genre=lofi`, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to create loify playlist.')
  }
}

/**
 * Deletes playlists by playlistId.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Promise} Axios delete request promise.
 */
export async function deletePlaylist(playlistId?: string) {
  if (!playlistId) {
    throw new Error('Invalid playlist ID. Playlist ID cannot be null or undefined.')
  }
  try {
    return await client.delete(`/me/playlists/${playlistId}`)
  } catch (error) {
    throw new Error('Failed to delete playlists.')
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
    throw new Error('Failed to delete playlists.')
  }
}

/**
 * Fetches all playlists for the user.
 * @returns {Array} List of playlist objects with id, name, and image.
 */
export async function fetchPlaylists() {
  try {
    const response = await client.get('/me/playlists')
    return response.data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.images?.[0]?.url
    }))
  } catch (error) {
    throw new Error('Failed to fetch playlists.')
  }
}

/**
 * Fetches an image for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {string} URL of the playlist image.
 */
export async function fetchPlaylistImage(playlistId?: string) {
  if (!playlistId) {
    throw new Error('Invalid playlist ID. Playlist ID cannot be null or undefined.')
  }
  try {
    const response = await client.get(`/playlists/${playlistId}`)
    return response.data.images[0].url
  } catch (error) {
    throw new Error('Failed to fetch playlist image.')
  }
}
