<script setup lang="ts"></script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  font-family: 'night-pumpkind', sans-serif;
  color: #000000;
  font-size: 2rem;
  padding-left: 4.5rem;
  padding-right: 4.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  border: none;
  border-radius: 1rem;

  background-color: #837f94;
  display: flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
}
</style>
