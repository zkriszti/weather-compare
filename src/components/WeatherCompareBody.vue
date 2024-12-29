<script setup>
import { ref, reactive } from "vue";
import MultiSelect from "primevue/multiselect";
import ThreeColCompareBox from "./ThreeColCompareBox.vue";

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

const compareData = computed(() => {
  if (!city1.value || !city2.value) {
    return "You need two selected cities for comparison";
  }
};
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
    <ThreeColCompareBox :selectedCities="selectedCities" />
  </div>
</template>

<style scoped>
.weather-compare-body {
  overflow: auto;
}
</style>
