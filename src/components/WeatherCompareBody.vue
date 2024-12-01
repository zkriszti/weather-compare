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

/* const {
  weatherData: weather1Data,
  weatherIsFetching: weather1IsFetching,
  weatherIsError: weather1IsError,
  weatherRefetch: refetch1,
  weatherIsSuccess: success1,
} = useWeatherQuery(selectedCities?.value?.[0], "COMPARE W1");
const {
  weatherData: weather2Data,
  weatherIsFetching: weather2IsFetching,
  weatherIsError: weather2IsError,
  weatherRefetch: refetch2,
  weatherIsSuccess: success2,
} = useWeatherQuery(selectedCities?.value?.[1], "COMPARE W2"); */
const city1 = computed(() => selectedCities.value[0]);
const city2 = computed(() => selectedCities.value[1]);
const weather1 = useWeatherQuery(city1, "COMPARE W1");
const weather2 = useWeatherQuery(city2, "COMPARE W2");

let diff = ref(0);

// GET COMPARE RESULTS:
/* const compareData = computed(() => {
  if (!selectedCities?.value?.[0] || !selectedCities?.value?.[1]) {
    return "Please choose two cities to compare";
  }

  if (weather1IsFetching?.value || weather2IsFetching?.value) {
    return "loading...";
  } else if (weather1IsError.value || weather2IsError.value) {
    return "error...";
  }

  console.log("COMPUTED RUNNING");
  // this is still correct:
  console.log(
    `${selectedCities?.value[0]?.id}-${selectedCities?.value[1]?.id}`
  );

  // we fail here:
  // we should be able to expect weatherData available here as it's neither fetching, nor erroring anymore
  // data is still the old city2 here:
  console.log("--- failing here, data still refers to old city: ---");
  console.log({
    weather2Data_TMAX:
      weather2Data?.value.daily?.data?.[0]?.all_day?.temperature_max,
    timezone: weather2Data?.value.timezone,
  });
  console.log("withRef:", {
    weather2DataREF_TMAX:
      weather2DataRef?.value.daily?.data?.[0]?.all_day?.temperature_max,
    timezoneREF: weather2DataRef?.value.timezone,
  });

  diff = Math.round(
    weather2Data?.value?.daily?.data?.[0]?.all_day?.temperature_max -
      weather1Data?.value?.daily?.data?.[0]?.all_day?.temperature_max
  );
  console.log("diff: ---", diff);

  return diff;
}); */

const compareData = computed(() => {
  if (!city1.value || !city2.value) {
    return "You need two selected cities for comparison";
  }

  if (weather1.weatherIsFetching.value || weather2.weatherIsFetching.value) {
    return "loading...";
  } else if (weather1.weatherIsError.value || weather2.weatherIsError.value) {
    return "error...";
  }

  console.log("COMPUTED RUNNING");
  console.log(`${city1.value.id}-${city2.value.id}`);

  console.log("--- Weather data: ---");
  console.log({
    weather2Data_TMAX:
      weather2.weatherData.value?.daily?.data?.[0]?.all_day?.temperature_max,
    timezone: weather2.weatherData.value?.timezone,
  });

  diff.value = Math.round(
    weather2.weatherData.value?.daily?.data?.[0]?.all_day?.temperature_max -
      weather1.weatherData.value?.daily?.data?.[0]?.all_day?.temperature_max
  );
  console.log("diff: ---", diff.value);

  return diff.value;
});

const citiesToPass = computed(() => {
  return [selectedCities?.value[0], selectedCities?.value[1]];
});
</script>

<template>
  <div class="weather-compare-body">
    <div>{{ selectedCities }}</div>
    <button @click="selectedCities = [cities[2], cities[3]]">
      Change Cities
    </button>
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
      <CompareResults :result="compareData" :citiesToPass="citiesToPass" />
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
