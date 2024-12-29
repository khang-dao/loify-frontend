<script setup lang="ts"></script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  font-family: var(--font-family-primary);
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
  cursor: pointer;
}

@media (max-width: 1200px) {
  button {
    font-size: var(--font-size-md);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
}

@media (max-width: 768px) {
  button {
    font-size: var(--font-size-sm);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
}
</style>
