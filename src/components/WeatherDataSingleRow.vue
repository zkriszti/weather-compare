<script setup>
import WeatherIcon from "./WeatherIcon.vue";

const props = defineProps({
  isActiveRow: Boolean,
  displayDate: Boolean,
  day: String,
  min: Number,
  max: Number,
  icon: Number,
});
</script>

<template>
  <!-- TODO: use classNames -->
  <div class="item-row" :class="isActiveRow ? 'item-row-active' : null">
    <span v-if="displayDate">{{ day }}</span>
    <span>{{ min }}</span>
    <span>{{ max }}</span>
    <WeatherIcon :icon="icon" />
  </div>
</template>

<style scoped>
.item-row {
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: 8px;
  margin-bottom: 12px;
  opacity: 0.7;
}

.item-row.item-row-active {
  font-weight: 800;
  opacity: 1;
}

.item-row span {
  align-content: center;
}
</style>
