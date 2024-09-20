<script setup lang="ts">
import APIGetButton from '@/components/APIGetButton.vue'
import APIPostButton from '@/components/APIPostButton.vue'
import TrackItem from '@/components/TrackItem.vue'

import axios from 'axios'
import { ref } from 'vue'

const newPlaylistRequestBody = ref({
  name: 'Test Playlist #1',
  description: 'this is a test playlist c:',
  public: true,
  collaborative: false
})

const tracksToLoify = ref({
  trackNames: [
    'Chasing Cars',
    'Lanterns',
    'Can We Kiss Forever?',
    'LOVE. FEAT. ZACARI.',
    'Hey There Delilah',
    'How to Save a Life',
    'Six Degrees of Separation',
    'The Scientist',
    'Fix You',
    'Yellow',
    'Let Her Go',
    'All of Me',
    'Say Something',
    'Nights',
    'Get You The Moon (feat. Snøw)',
    'Little Wonders - Radio Version',
    'Thinkin Bout You',
    'drivers license',
    'Falling',
    'Name (feat. Tori Kelly)',
    'i hate u',
    "i love u (feat. olivia o'brien)",
    'This Town',
    'Somewhere Only We Know',
    'this is how you fall in love',
    'CHICKEN TENDIES',
    "I GUESS I'M IN LOVE",
    'Another Love'
  ]
})

const newTracksForPlaylistRequestBody = ref({})

async function loify() {
  const response = await axios.post(
    'http://localhost:8080/api/spotify/tracks/loify',
    tracksToLoify.value
  )
  console.log('YER:', response.data)
  const loifyedTrackIds = response.data.map((trackId) => `spotify:track:${trackId}`)
  newTracksForPlaylistRequestBody.value = {
    uris: loifyedTrackIds
  }

  console.log('newTracksForPlaylistRequestBody.value: ', newTracksForPlaylistRequestBody.value.uris)
}
</script>

<template>
  <main>
    <div class="column column-1">
      <h2>P L A Y L I S T S</h2>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734aef420e62863ebf622c27f5"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734aef420e62863ebf622c27f5"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734aef420e62863ebf622c27f5"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734aef420e62863ebf622c27f5"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734aef420e62863ebf622c27f5"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734aef420e62863ebf622c27f5"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734aef420e62863ebf622c27f5"/>
      
    </div>

    <div class="column column-2">
      <h2>S O N G S</h2>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b2734100e910642e6b6c6eeb0314"/>
    </div>

    <div class="column column-3">
      <h2>S O N G S 🍃</h2>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
      <TrackItem trackName="How to Save a Life" artistName="Coldplay" imgSrc="https://i.scdn.co/image/ab67616d0000b273a5262c86da2fe6d7a3120bc0"/>
    </div>
  </main>

  <!-- <div>
    <h1>welcome to loify 🍃</h1>
    <div class="button-wrapper">
      <APIGetButton url="http://localhost:8080/spotify/login">LOGIN</APIGetButton>

      <APIGetButton url="http://localhost:8080/api/spotify/users/daokhang/playlists"
        >get playlists by userID</APIGetButton
      >
      <APIGetButton url="http://localhost:8080/api/spotify/playlists/3rfEyXgEK3zaUp1Cjj5qhL"
        >get tracks by playlistID</APIGetButton
      >
      <APIPostButton
        url="http://localhost:8080/api/spotify/users/daokhang/playlists"
        :requestBody="newPlaylistRequestBody"
        >create new playlist for userID</APIPostButton
      >

      <APIGetButton url="http://localhost:8080/api/spotify/tracks/hotline%20bling"
        >get trackID by trackName</APIGetButton
      >

      <button @click="loify">loify tracks 🍃</button>
      <APIPostButton
        url="http://localhost:8080/api/spotify/playlists/6oHFtbQt6Tyyta6JnjM3kw/tracks"
        :requestBody="newTracksForPlaylistRequestBody"
        >add tracks to playlist</APIPostButton
      >
    </div>
  </div> -->
</template>

<style scoped>
main {
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  gap: 1rem
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
