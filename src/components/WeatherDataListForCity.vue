<script setup>
import { computed, ref } from "vue";
import WeatherIcon from "./WeatherIcon.vue";
import { useWeatherQuery } from "../data/weather";

const props = defineProps({
  selectedCity: Object,
});

const { weatherData, weatherIsFetching, weatherIsError } = useWeatherQuery(
  props.selectedCity
);
</script>

<template>
  <div v-if="weatherIsFetching">Loading...</div>
  <div v-else-if="weatherIsError">Sorry, an error happened</div>
  <div v-else-if="weatherData">
    <div class="items-list">
      <div
        class="item-row"
        v-for="item in weatherData.daily.data"
        :key="`row-${item.day}`"
        v-tooltip.bottom="item.summary"
      >
        <span>{{ item.day }}</span>
        <span>{{ Math.round(item.all_day.temperature_min) }}</span>
        <span>{{ Math.round(item.all_day.temperature_max) }}</span>
        <WeatherIcon :icon="item.icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-row {
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: 8px;
  margin-bottom: 12px;
}

.item-row span {
  align-content: center;
}
</style>
