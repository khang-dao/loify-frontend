<script setup lang="ts">
import axios from 'axios'

const { url } = defineProps(['url'])

const getData = async () => {
  const response = await axios.get(url)
  console.log(response.data)
}
</script>

<template>
  <button @click="getData">
    <slot></slot>
  </button>
</template>

<style scoped></style>
