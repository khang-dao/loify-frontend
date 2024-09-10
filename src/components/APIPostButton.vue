<script setup lang="ts">
import axios from 'axios'

const { url, requestBody } = defineProps(['url', 'requestBody'])

const postData = async () => {
  const response = await axios.post(url, requestBody)
  console.log(response.data)
}
</script>

<template>
  <button @click="postData">
    <slot></slot>
  </button>
</template>

<style scoped></style>
