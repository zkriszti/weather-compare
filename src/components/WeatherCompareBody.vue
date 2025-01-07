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

// Instead of using the built-in selection limit, we allow the third item to be selected, in which case the last item is replaced (so that last item doesn't need to be removed manually beforehand).
const handleCitiesChange = (event) => {
  // allow max. 2 cities to be selected
  if (event.value.length > MAX_CITIES_SELECTED) {
    selectedCities.value = [
      event.value[0],
      event.value[event.value.length - 1],
    ];
  } else {
    // Otherwise, update selectedCities with the new selection
    selectedCities.value = event.value;
  }
};


/* -- TEMPORARY WORKAROUND UNTIL BUG https://github.com/primefaces/primevue/issues/6112 GETS FIXED IN PRIMEVUE -- */
const handleCityRemove = (id) => {
  const indexToRemove = selectedCities.value.findIndex(
    (item) => item.id === id
  );

  if (indexToRemove !== -1) {
    console.log("before:", selectedCities.value);
    selectedCities.value = selectedCities.value.filter((c) => c.id !== id);
  }
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
        @change="handleCitiesChange"
        class="w-full md:w-80"
        filter
        @filter="onCityInput"
        :pt="{
          closeButton: () => ({
            style: { display: 'none' },
          }),
        }"
        :loading="placeIsFetching"
      >
        <template #option="slotProps">
          {{ slotProps.option.name }}
        </template>
        <!-- <template #chip="slotProps">
          {{ slotProps.value.name }}
        </template> -->
        <!-- TEMPORARY WORKAROUND UNTIL BUG https://github.com/primefaces/primevue/issues/6112 GETS FIXED IN PRIMEVUE-->
        <template #chip="{ value }">
          <Chip removable @remove="handleCityRemove(value.id)">
            {{ value.name }}
          </Chip>
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
