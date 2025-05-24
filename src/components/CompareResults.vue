<script setup>
import { computed } from "vue";

const props = defineProps({
  result: Object | String,
});

const MINIMAL_DIFF_FOR_SAME_WEATHER_RESULT = 2;

const displayResult = computed(() => {
  if (props.result.status === "OK") {
    const warmerOrCooler = props.result.tempDiff > 0 ? "warmer" : "cooler";
    return `On ${
      props.result.currentDate
    }, daily max. temperature is ${Math.abs(
      props.result.tempDiff
    )}°C ${warmerOrCooler} in ${props.result.otherCity} than in ${
      props.result.baseCity
    }`;
  } else {
    return props.result;
  }
});
</script>

<template>
  <div>{{ displayResult }}</div>
</template>
