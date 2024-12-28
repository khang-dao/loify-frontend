<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="picture"></div>

    <div class="text-container">
      <div class="heading"></div>
      <div class="sub-heading"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.picture {
  border-radius: 0.5rem;
  height: 100px;
  width: 100px;
  animation: pulse-bg 1s infinite;
}

.heading {
  border-radius: 0.5rem;
  height: 20px;
  width: 150px;
  animation: pulse-bg 1s infinite;
}

.sub-heading {
  border-radius: 0.5rem;
  height: 20px;
  width: 100px;
  animation: pulse-bg 1s infinite;
}

.text-container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

img {
  border-radius: var(--border-radius-lg);
}

@keyframes pulse-bg {
  0% {
    background-color: rgb(216, 216, 216);
  }
  50% {
    background-color: rgb(188, 188, 188);
  }
  100% {
    background-color: rgb(216, 216, 216);
  }
}

@media (max-width: 1024px) {
  .text-container {
    display: none;
  }

  img {
    border-radius: var(--border-radius-sm);
  }
}
</style>
