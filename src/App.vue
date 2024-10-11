<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
</script>

<template>
  <!-- <header> -->
    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header> -->

  <FadeTransition>
    <RouterView />
  </FadeTransition>
</template>

<style scoped> 
</style>
