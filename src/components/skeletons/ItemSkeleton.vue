<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="picture"></div>

    <div class="text-container">
      <h3>...</h3>
      <p>...</p>
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
  /* background-color: grey; */
  height: 100px;
  width: 100px;
  animation: pulse-bg 1s infinite;
}

.text-container {
  display: flex;
  flex-direction: column;
  font-family: 'League Spartan', sans-serif;
  color: #6a6a6a;
  gap: 0.4rem;
  animation: pulse-bg 1s infinite;
}

img {
  border-radius: 0.5rem;
}

@keyframes pulse-bg {
    0% {
background-color: #eee;
    }
    50%{
        background-color: rgb(188, 188, 188);

    }
    100%{
        background-color: #eee;

    }
    
}
</style>
