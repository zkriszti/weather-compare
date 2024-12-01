<script setup>
import { ref, computed, reactive, watch, onMounted, toRaw } from "vue";
import MultiSelect from "primevue/multiselect";
import WeatherDataListForCity from "./WeatherDataListForCity.vue";
import CompareResults from "./CompareResults.vue";
import { useWeatherQuery } from "../data/weather";

const MINIMAL_DIFF_FOR_SAME_WEATHER_RESULT = 2;

const cities = reactive([
  { id: "budapest", name: "Budapest" },
  { id: "valencia-2509954", name: "Valencia" },
  { id: "alicante", name: "Alicante" },
  { id: "oslo", name: "Oslo" },
  { id: "cluj", name: "Cluj" },
  { id: "lisbon", name: "Lisbon" },
  { id: "madrid", name: "Madrid" },
  { id: "portimao", name: "Portimão" },
  { id: "berlin", name: "Berlin" },
]);

let selectedCities = ref([cities[0], cities[1]]);

const city1 = computed(() => selectedCities.value[0]);
const city2 = computed(() => selectedCities.value[1]);
const weather1 = useWeatherQuery(city1, "COMPARE W1");
const weather2 = useWeatherQuery(city2, "COMPARE W2");

let diff = ref(0);

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
</script>

<template>
  <div class="weather-compare-body">
    <div>{{ selectedCities }}</div>
    <MultiSelect
      v-model="selectedCities"
      display="chip"
      :options="cities"
      optionLabel="name"
      filter
      placeholder="Select Cities"
      :maxSelectedLabels="2"
      class="w-full md:w-80"
    />
    <div class="three-col-compare-box">
      <WeatherDataListForCity
        :selectedCity="selectedCities?.[0]"
        :key="selectedCities?.[0]?.id"
        displayDate
      />
      <WeatherDataListForCity
        :selectedCity="selectedCities?.[1]"
        :key="selectedCities?.[1]?.id"
        displayDate
      />
      <CompareResults :result="compareData" />
    </div>
  </div>
</template>

<style scoped>
.weather-compare-body {
  overflow: auto;
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
