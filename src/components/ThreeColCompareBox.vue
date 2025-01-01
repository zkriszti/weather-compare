<script setup>
import { ref, computed } from "vue";
import WeatherDataListForCity from "./WeatherDataListForCity.vue";
import CompareResults from "./CompareResults.vue";
import { useWeatherQuery } from "../data/weather";
import { vOnClickOutside } from "@vueuse/components";

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

const isCityBoxActive = ref(false);
const setIsCityBoxActive = (switchType = "toggle") => {
  if (switchType === "toggle") {
    isCityBoxActive.value = !isCityBoxActive.value;
  } else {
    // click outside case - WORKS, though it's not very intuitive code-wise
    // as we need to know that providing no argument is only for clickOutside
    isCityBoxActive.value = false;
  }
};
const currentlyActiveRow = ref(0);
const changeCurrentlyActiveRow = (v) => {
  if (!isCityBoxActive.value) return;
  const newIndex = currentlyActiveRow.value + v;
  if (newIndex >= 0 && newIndex < DISPLAYED_DAYS_LENGTH) {
    currentlyActiveRow.value = newIndex;
  }
  console.log(currentlyActiveRow.value);
};
</script>
<template>
  <!-- TODO: rather use the classNames library here -->
  <div
    class="three-col-compare-box"
    :class="isCityBoxActive ? 'active' : null"
    @click="setIsCityBoxActive('toggle')"
    tabindex="0"
    @keyup.down="changeCurrentlyActiveRow(1)"
    @keyup.up="changeCurrentlyActiveRow(-1)"
    v-on-click-outside="setIsCityBoxActive"
  >
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
.active {
  outline: 3px solid red;
}

.three-col-compare-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 24px;
  margin-top: 24px;
}
.three-col-compare-box > * {
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>
