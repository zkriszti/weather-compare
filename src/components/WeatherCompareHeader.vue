<script setup></script>

<template>
  <div class="header-wrapper">
    <header>
      <h1 class="weather-compare-header">weather-compare</h1>
      <img src="/weather_icons/2.png" alt="" />
    </header>
  </div>
</template>

<style scoped>
header {
  align-self: center;
  position: relative;
  display: inline-flex;
}
h1 {
  font-family: "Rammetto One", sans-serif;
}

img {
  position: absolute;
  right: -22px;
  top: 24px;
  z-index: -1;
  clip-path: polygon(
    55% 100%,
    100% 100%,
    100% 0%,
    0% 0%,
    0% 45%,
    55% 45%,
    55% 100%
  );
}
</style>
