<script setup lang="ts">
import axios from 'axios'

const { url } = defineProps(['url'])

const useSpotifyLogin = async () => {
    try {
    const response = await axios.get("http://localhost:8080/spotify/login");
    // Redirect to the Spotify login URL
    window.location.href = response.data.redirectUrl;
  } catch (error) {
    console.error("Error during Spotify login:", error);
  }
}
</script>

<template>
  <button @click="useSpotifyLogin">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 20px; /* Add some padding for a better look */
  background-color: #6A6A6A; /* Background color */
  color: #FFFFFF; /* Text color */
  border: none; /* Remove the default border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1rem; /* Font size */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

/* Button hover effect */
button:hover {
  background-color: #5A5A5A; /* Darker shade on hover */
}
</style>
