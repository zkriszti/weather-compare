<script setup>
import { ref, computed } from "vue";
import MultiSelect from "primevue/multiselect";
import ThreeColCompareBox from "./ThreeColCompareBox.vue";
import { usePlaceQuery } from "../data/availableCities";

const defaultCities = [
  { id: "budapest", name: "Budapest" },
  { id: "valencia-2509954", name: "Valencia" },
];

let selectedCities = ref(defaultCities);
const searchString = ref("");
const { placeData, placeRefetch } = usePlaceQuery(searchString, "PLACE_QUERY");

const handleCitiesChange = () => {
  if (selectedCities.value.length > 2) {
    selectedCities.value.splice(1, 1); // Remove the last selected item
// Dynamically populate MultiSelect's dropdown based on user input:
const placesOptions = computed(() => {
  if (placeData.value && Array.isArray(placeData.value)) {
    return placeData.value.map((place) => ({
      name: `${place.name}, ${place.country}`,
      id: place.place_id,
    }));
  }
  return [];
});

const onCityInput = (event) => {
  searchString.value = event.value;
  placeRefetch();
};
</script>

<template>
  <div class="weather-compare-body">
    <MultiSelect
      v-model="selectedCities"
      display="chip"
      :options="placesOptions"
      optionLabel="name"
      placeholder="Select Cities"
      :maxSelectedLabels="2"
      class="w-full md:w-80"
      @change="handleCitiesChange"
      filter
      @filter="onCityInput"
      <template #option="slotProps">
        {{ slotProps.option.name }}
      </template>
      <template #chip="slotProps">
        {{ slotProps.value.name }}
      </template>
    </MultiSelect>
    <ThreeColCompareBox :selectedCities="selectedCities" />
  </div>
</template>

<style scoped>
.weather-compare-body {
  overflow: auto;
}
</style>
