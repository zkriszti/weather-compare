<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: Number,
});

const iconUrl = computed(() => `/weather_icons/${props.icon}.png`);
</script>

<template>
  <img :src="iconUrl" alt="" />
</template>

<style scoped>
img {
  padding: 8px 0;
}
</style>
