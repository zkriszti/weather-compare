<script setup>
import { ref, computed, reactive, watch } from "vue";
import { useWeatherQuery } from "../data/weather";

const props = defineProps({
  result: Number | String,
  citiesToPass: Array,
});

console.log(props.result);
console.log(props.citiesToPass);
</script>

<template>
  <div>
    <div>{{ result }}</div>
    <div>{{ citiesToPass }}</div>
  </div>
</template>

<style scoped></style>
