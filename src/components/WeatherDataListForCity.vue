<script setup>
import { computed, ref } from "vue";
import WeatherIcon from "./WeatherIcon.vue";
import { useWeatherQuery } from "../data/weather";
import Skeleton from "primevue/skeleton";

const props = defineProps({
  selectedCity: Object,
  displayDate: Boolean,
});

const { weatherData, weatherIsFetching, weatherIsError } = useWeatherQuery(
  props.selectedCity,
  "BOX"
);
</script>

<template>
  <div class="city-block">
    <div class="city-block-heading">
      {{ selectedCity ? selectedCity.name : "Please select a city..." }}
    </div>
    <div v-if="weatherIsError" class="city-block-data-error">
      Sorry, an error happened
    </div>
    <div v-else-if="weatherIsFetching" class="city-block-data-fetching">
      <div class="items-list">
        <Skeleton width="100%" height="4rem" v-for="n in 7" />
      </div>
    </div>
    <div v-else class="city-block-data-results">
      <!-- weatherData is loaded -->
      <div class="items-list">
        <div
          v-if="selectedCity"
          class="item-row"
          v-for="item in weatherData?.daily?.data"
          :key="`row-${item.day}`"
          v-tooltip.bottom="item.summary"
        >
          <span v-if="displayDate">{{ item.day }}</span>
          <span>{{ Math.round(item.all_day.temperature_min) }}</span>
          <span>{{ Math.round(item.all_day.temperature_max) }}</span>
          <WeatherIcon :icon="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.city-name {
  padding: 8px 0;
}
.items-list {
  padding: 0 24px;
  > * {
    margin-bottom: 12px;
  }
}
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
