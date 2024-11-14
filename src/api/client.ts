import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1',  // TODO: get this from .env file
  withCredentials: true,
});


export default client;


// TODO: consider this
// constants/api.js
// export const BASE_URL = "http://localhost:8080/api/v1";
// export const API_ENDPOINTS = {
//   playlists: `${BASE_URL}/me/playlists`,
//   playlistTracks: (id) => `${BASE_URL}/playlists/${id}/tracks`,
//   loifyPlaylist: (id) => `${BASE_URL}/playlists/${id}/loify?genre=lofi`,
// };