<script setup lang="ts">
import { RouterView } from 'vue-router'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
</script>

<template>
  <FadeTransition>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </FadeTransition>
</template>

<style scoped> 
</style>
