<script setup lang="ts">
import axios from 'axios'

const { url } = defineProps(['url'])

const getData = async () => {
  const response = await axios.get(url)
  console.log(response.data)

  window.open(response.data.redirectUrl, '_blank', 'noopener,noreferrer,width=800,height=600');

}
</script>

<template>
  <button @click="getData">
    <slot></slot>
  </button>
</template>

<style scoped></style>
