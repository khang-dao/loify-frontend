<template>
  <div class="container">
    <h2 class="playlist-heading">n e w<br />p l a y l i s t</h2>
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
  width: 70%;
}

.playlist-heading {
  font-family: var(--font-family-primary);
  text-align: center;
  font-size: 2rem;
}

.playlist-name {
  font-family: var(--font-family-secondary);
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

@media (max-width: 1200px) {
  .picture {
    height: 70px;
    width: 70px;
    border-radius: var(--border-radius-sm);
  }

  .playlist-heading {
    font-size: var(--font-size-md);
  }
}


@media (max-width: 768px) {
  .container {
    gap: 0.5rem;
  }

  .playlist-heading {
    font-size: var(--font-size-sm);
  }

  .playlist-name {
    font-size: var(--font-size-sm);
  }
}
</style>
