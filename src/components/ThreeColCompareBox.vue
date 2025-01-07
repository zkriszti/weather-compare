<script setup>
import { ref, computed, onMounted } from "vue";
import WeatherDataListForCity from "./WeatherDataListForCity.vue";
import CompareResults from "./CompareResults.vue";
import { useWeatherQuery } from "../data/weather";
import { useGlobalKeyBindings } from "../utils/useGlobalKeyBindings";

const props = defineProps({
  selectedCities: Array,
});

const city1 = computed(() => props.selectedCities[0]);
const city2 = computed(() => props.selectedCities[1]);
const weather1 = useWeatherQuery(city1, "COMPARE W1");
const weather2 = useWeatherQuery(city2, "COMPARE W2");

let diff = ref(0);
const MINIMAL_DIFF_FOR_SAME_WEATHER_RESULT = 2;
const DISPLAYED_DAYS_LENGTH = 7;

const compareData = computed(() => {
  if (!city1.value || !city2.value) {
    return "You need two selected cities for comparison";
  }

  if (weather1.weatherIsFetching.value || weather2.weatherIsFetching.value) {
    return "loading...";
  } else if (weather1.weatherIsError.value || weather2.weatherIsError.value) {
    return "error...";
  }

  diff.value = Math.round(
    weather2.weatherData.value?.daily?.data?.[0]?.all_day?.temperature_max -
      weather1.weatherData.value?.daily?.data?.[0]?.all_day?.temperature_max
  );

  return diff.value;
});

const changeCurrentlyActiveRow = (key) => {
  // key can only be "ArrowDown" or "ArrowUp"
  const v = key === "down" ? 1 : -1;

  const newIndex = currentlyActiveRow.value + v;
  if (newIndex >= 0 && newIndex < DISPLAYED_DAYS_LENGTH) {
    currentlyActiveRow.value = newIndex;
  }
  console.log(currentlyActiveRow.value);
};

onMounted(() => {
  useGlobalKeyBindings({
    ArrowDown: () => changeCurrentlyActiveRow("down"),
    ArrowUp: () => changeCurrentlyActiveRow("up"),
  });
});
</script>
<template>
  <div class="three-col-compare-box">
    <WeatherDataListForCity
      :selectedCity="selectedCities?.[0]"
      :key="selectedCities?.[0]?.id"
      :activeRow="currentlyActiveRow"
      displayDate
    />
    <WeatherDataListForCity
      :selectedCity="selectedCities?.[1]"
      :key="selectedCities?.[1]?.id"
      :activeRow="currentlyActiveRow"
      displayDate
    />
    <CompareResults :result="compareData" />
  </div>
</template>

<style scoped>
.three-col-compare-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content;
  column-gap: 24px;
  margin-top: 24px;
}
.three-col-compare-box > * {
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.87); /* #cfcdcd;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
