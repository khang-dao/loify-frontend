<template>
  <div class="container">
    <h2 class="playlist-heading">N E W<br />P L A Y L I S T</h2>
    <div class="picture"></div>
    <h2 class="playlist-name">loading...</h2>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.playlist-heading {
  font-family: var(--font-family-secondary);
  color: #ffffff;
  text-align: center;
  font-size: 2rem;
}

.playlist-name {
  font-family: var(--font-family-secondary);
  color: #ffffff;
  text-align: center;
  font-size: 1rem;
}

.picture {
  border-radius: var(--border-radius-lg);
  height: 130px;
  width: 130px;
  animation: pulse-bg 1s infinite;
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
  .picture {
    border-radius: var(--border-radius-sm);
  }
}
</style>
