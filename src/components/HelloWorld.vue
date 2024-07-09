<script setup>
import { ref, computed } from 'vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import WeatherIcon  from './WeatherIcon.vue'
import MultiSelect from "primevue/multiselect"
import { useWeatherQuery } from '../data/weather';

// const data = ref(query.data.value);
const defaultCity = {id: 'budapest', name: 'Budapest'};
const selectedCities = ref([defaultCity]);
const cities = [
  defaultCity,
  {id: 'alicante', name: 'Alicante'},
  {id: 'cluj', name: 'Cluj'},
  {id: 'lisbon', name: 'Lisbon'},
  {id: 'madrid', name: 'Madrid'},
  {id: 'portimao', name: 'Portimão'}
];

const { weatherData, weatherIsFetching, weatherIsError } = useWeatherQuery(selectedCities);

</script>

<template>
  <VueQueryDevtools />
  <div v-if="weatherIsFetching">Loading...</div>
  <div v-else-if="weatherIsError">Sorry, an error happened</div>
  <div v-else-if="weatherData">
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
    <div class="items-list">
      <div class="item-row" v-for="(item) in weatherData.daily.data" :key="`row-${item.day}`" v-tooltip.bottom="item.summary">
        <span>{{item.day}}</span>
        <!-- <span>{{item.summary}}</span> -->
        <span>{{Math.round(item.all_day.temperature_min)}}</span>
        <span>{{Math.round(item.all_day.temperature_max)}}</span>
        <WeatherIcon :icon="item.icon"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-row {
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: 8px;
  margin-bottom: 12px
}

.item-row span {
  align-content: center;
}
</style>
