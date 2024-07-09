<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  icon: Number
})

const iconUrl = computed(() => `/weather_icons/${props.icon}.png`);
// const iconUrl = new URL(`/weather_icons/${icon.value}.png`, import.meta.url).href;

</script>

<template>
  <img :src="iconUrl" alt="">
</template>

<style scoped>
img {
  padding: 8px 0;
}
</style>
