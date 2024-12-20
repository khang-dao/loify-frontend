<template>
  <a
    class="bmc-button"
    target="_blank"
    href="https://www.buymeacoffee.com/khangdao"
    rel="noopener noreferrer"
  >
    <img
      src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
      alt="Buy khangdao a coffee"
    />
    <p class="button-text">buy me a coffee</p>
  </a>
</template>

<style scoped>
.bmc-button {
  opacity: 0.7;
  transition: opacity 0.3s ease;
  line-height: 36px;
  height: 37px;
  text-decoration: none;
  display: inline-flex;
  color: #333333;
  background-color: #ffdd00;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 1px 9px;
  font-size: 23px;
  letter-spacing: 0.6px;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  margin: 0 auto;
  box-sizing: border-box;
}

.bmc-button:hover {
  opacity: 1;
}

.bmc-button > img {
  width: 27px;
  margin-bottom: 1px;
  box-shadow: none;
  order: none;
  vertical-align: middle;
  margin-right: 5px;
}

.button-text {
  font-family: 'night-pumpkind', cursive;
}

@media (max-width: 1024px) {
  .button-text {
    display: none;
  }
}
</style>
