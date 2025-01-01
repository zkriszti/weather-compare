<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import WeatherCompareHeader from "./WeatherCompareHeader.vue";
import WeatherCompareBody from "./WeatherCompareBody.vue";
</script>

<!-- TODO: dark and light mode -->

<template>
  <VueQueryDevtools />
  <div class="main-layout">
    <WeatherCompareHeader />
    <WeatherCompareBody />
  </div>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
