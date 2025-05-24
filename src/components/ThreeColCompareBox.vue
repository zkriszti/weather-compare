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

const noTwoCitiesSelected = computed(() => !city1.value || !city2.value);
const weatherDataIsFetching = computed(
  () => weather1.weatherIsFetching.value || weather2.weatherIsFetching.value
);
const weatherDataIsError = computed(
  () => weather1.weatherIsError.value || weather2.weatherIsError.value
);

let diff = ref(0);
const currentlyActiveRow = ref(0);
const DISPLAYED_DAYS_LENGTH = 7;

const compareData = computed(() => {
  // -- NO TWO CITIES SELECTED ---
  if (noTwoCitiesSelected.value) {
    return "You need two selected cities for comparison";
  }
  // --- LOADING OR ERROR STATES ---
  if (weatherDataIsFetching.value) {
    return "Data is loading...";
  } else if (weatherDataIsError.value) {
    return "Sorry, an error occurred...";
  }

  /// --- SUCCESS, CALCULATE DIFF ---
  diff.value = Math.round(
    weather2.weatherData.value?.daily?.data?.[currentlyActiveRow.value]?.all_day
      ?.temperature_max -
      weather1.weatherData.value?.daily?.data?.[currentlyActiveRow.value]
        ?.all_day?.temperature_max
  );

  return {
    tempDiff: diff.value,
    baseCity: city1.value.name,
    otherCity: city2.value?.name,
    currentDate:
      weather1.weatherData.value?.daily?.data?.[currentlyActiveRow.value].day,
    status: "OK",
  };
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

const setActiveRowByClick = (rowIndex) => {
  currentlyActiveRow.value = rowIndex;
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
      shouldDisplayDate
      @row-selected="setActiveRowByClick($event)"
    >
    </WeatherDataListForCity>
    <WeatherDataListForCity
      :selectedCity="selectedCities?.[1]"
      :key="selectedCities?.[1]?.id"
      :activeRow="currentlyActiveRow"
      displayDate
      @row-selected="setActiveRowByClick($event)"
    >
    </WeatherDataListForCity>
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
  padding: 0 24px;
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.87); /* #cfcdcd;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
