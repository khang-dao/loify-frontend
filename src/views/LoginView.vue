<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

import Spinner from '@/components/misc/Spinner.vue'
import config from '@/config'
const loginButtonClicked = ref(false)
const toggleLoginButtonClicked = () => loginButtonClicked.value = !loginButtonClicked.value
</script>

<template>
  <main class="main">
    <div class="container">
      <h1 class="heading">
        Our application uses Spotify's implementation of the secure OAuth 2.0 framework to safeguard
        your data and ensure your privacy is protected.
      </h1>
      <a class="button" :href="`${config.apiBaseUrl}/auth/session`" rel="noopener noreferrer" @click="toggleLoginButtonClicked" v-if="!loginButtonClicked">
        click to login
      </a>
      <Spinner v-else />
    </div>
    <RouterLink to="/">
      <FontAwesomeIcon
        :icon="['fas', 'house']"
        class="icon house"
      />
    </RouterLink>
  </main>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: 'league-spartan', sans-serif;
  margin: 10rem;
  text-align: center;
  line-height: 200%;
}

.heading {
  color: #000000;
  font-size: 1.5rem;
}

.button {
  text-decoration: none;
  font-size: 1rem;
  color: #171717;
  cursor: pointer;
}

.icon {
  color: #54198A;
  cursor: pointer;
}

.icon.house {
  font-size: 1.25rem;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .container {
    margin: 5rem;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    margin: 2rem;
  }
}
</style>
