<script setup>
import { ref, computed } from "vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
// import WeatherIcon from './WeatherIcon.vue'
import MultiSelect from "primevue/multiselect";
// import { useWeatherQuery } from '../data/weather';
import WeatherDataListForCity from "./WeatherDataListForCity.vue";

// const data = ref(query.data.value);
const defaultCity = { id: "budapest", name: "Budapest" };
const selectedCities = ref([defaultCity, defaultCity]);
const cities = [
  defaultCity,
  { id: "alicante", name: "Alicante" },
  { id: "cluj", name: "Cluj" },
  { id: "lisbon", name: "Lisbon" },
  { id: "madrid", name: "Madrid" },
  { id: "portimao", name: "Portimão" },
  { id: "oslo", name: "Oslo" },
  { id: "berlin", name: "Berlin" },
];

/* const { weatherData, weatherIsFetching, weatherIsError } = useWeatherQuery(selectedCities); */
</script>

<template>
  <VueQueryDevtools />
  <div>{{ selectedCities }}</div>
  <MultiSelect
    v-model="selectedCities"
    display="chip"
    :options="cities"
    optionLabel="name"
    :optionValue="value"
    filter
    placeholder="Select Cities"
    :maxSelectedLabels="2"
    class="w-full md:w-80"
  />
  <div class="two-col-compare-box">
    <WeatherDataListForCity
      :selectedCity="selectedCities[0]"
      :key="selectedCities[0]?.id"
    />
    <WeatherDataListForCity
      :selectedCity="selectedCities[1]"
      :key="selectedCities[1]?.id"
    />
  </div>
</template>

<style scoped>
.two-col-compare-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  margin-top: 24px;
}
.two-col-compare-box > * {
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>
