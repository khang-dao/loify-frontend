<script setup lang="ts">
import APIGetButton from '@/components/APIGetButton.vue'
import APIPostButton from '@/components/APIPostButton.vue'
import axios from 'axios';
import { ref } from 'vue';

const newPlaylistRequestBody = ref({
    name: "Test Playlist #1",
    description: "this is a test playlist c:",
    public: true,
    collaborative: false
})

const tracksToLoify = ref({
    trackNames: [
        "Chasing Cars",
        "Lanterns",
        "Can We Kiss Forever?",
        "LOVE. FEAT. ZACARI.",
        "Hey There Delilah",
        "How to Save a Life",
        "Six Degrees of Separation",
        "The Scientist",
        "Fix You",
        "Yellow",
        "Let Her Go",
        "All of Me",
        "Say Something",
        "Nights",
        "Get You The Moon (feat. Snøw)",
        "Little Wonders - Radio Version",
        "Thinkin Bout You",
        "drivers license",
        "Falling",
        "Name (feat. Tori Kelly)",
        "i hate u",
        "i love u (feat. olivia o'brien)",
        "This Town",
        "Somewhere Only We Know",
        "this is how you fall in love",
        "CHICKEN TENDIES",
        "I GUESS I'M IN LOVE",
        "Another Love"
    ]
})

const newTracksForPlaylistRequestBody = ref({})

async function loify() {
  const response = await axios.post("http://localhost:8080/api/spotify/tracks/loify", tracksToLoify.value)
  console.log("YER:" , response.data)
  const loifyedTrackIds = response.data.map(trackId => `spotify:track:${trackId}`)
  newTracksForPlaylistRequestBody.value = {
    uris: loifyedTrackIds
  }

  console.log("newTracksForPlaylistRequestBody.value: ", newTracksForPlaylistRequestBody.value.uris)
}

</script>

<template>
  <main>
    <p>HELLO WORLD</p>
    <div class="button-wrapper">
      <APIGetButton url="http://localhost:8080/api/spotify/auth/code">get auth code</APIGetButton>
      <APIPostButton url="http://localhost:8080/api/spotify/auth/token">get auth token</APIPostButton>

      <APIGetButton url="http://localhost:8080/api/spotify/users/daokhang/playlists">get playlists by userID</APIGetButton>
      <APIGetButton url="http://localhost:8080/api/spotify/playlists/3rfEyXgEK3zaUp1Cjj5qhL">get tracks by playlistID</APIGetButton>
      <APIPostButton url="http://localhost:8080/api/spotify/users/daokhang/playlists" :requestBody="newPlaylistRequestBody">create new playlist for userID</APIPostButton>
      
      <APIGetButton url="http://localhost:8080/api/spotify/tracks/hotline%20bling">get trackID by trackName</APIGetButton>
      
      <button @click="loify">loify tracks 🍃</button>
      <APIPostButton url="http://localhost:8080/api/spotify/playlists/0w2Swb09lqjdEKly3xN5LT/tracks" :requestBody="newTracksForPlaylistRequestBody">add tracks to playlist</APIPostButton>
    </div>
  </main>
</template>

<style scoped>
.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
