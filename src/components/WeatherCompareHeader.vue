<script setup></script>

<template>
  <div class="header-wrapper">
    <header>
      <h1 class="weather-compare-header">
        <span>weather </span>
        <span>over </span>
        <span>
          <span>there</span><img src="/weather_icons/2.png" alt="" />
        </span>
      </h1>
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

h1 > span:last-child {
  position: relative;
  outline: 1px solid red;
}

img {
  position: absolute;
  right: -22px;
  top: 3px;
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
