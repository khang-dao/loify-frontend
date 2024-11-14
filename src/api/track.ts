import client from '@/api/client';


/**
 * Fetches tracks for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Array} List of track objects with id, name, artist, and image.
 */
export async function fetchTracks(playlistId) {
  try {
    const response = await client.get(`/playlists/${playlistId}/tracks`)
    return response.data.items.map((item) => ({
      id: item.track?.id,
      name: item.track?.name,
      artist: item.track?.artists?.[0].name,
      image: item.track?.album.images?.[0].url
    }))
  } catch (error) {
    throw new Error('Failed to fetch tracks.')
  }
}

/**
 * Fetches loify tracks for a specified playlist.
 * @param {string} playlistId - The ID of the playlist.
 * @returns {Array} List of loify track objects.
 */
export async function fetchLoifyTracks(playlistId) {  // TODO: make `genre` a param
  try {
    const response = await client.get(`/playlists/${playlistId}/loify?genre=lofi`)
    return response.data
      .filter((item) => item?.tracks?.items?.[0]?.id)
      .map((item) => ({
        id: item.tracks.items[0].id,
        name: item.tracks.items[0].name,
        artist: item.tracks.items[0].artists[0].name,
        image: item.tracks.items[0].album.images[0].url
      }))
  } catch (error) {
    throw new Error('Failed to fetch loify tracks.')
  }
}
