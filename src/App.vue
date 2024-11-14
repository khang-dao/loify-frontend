<script setup lang="ts">
import { RouterView } from 'vue-router'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <FadeTransition>
      <component :is="Component" />
    </FadeTransition>
  </RouterView>
</template>

<style scoped> 
</style>
