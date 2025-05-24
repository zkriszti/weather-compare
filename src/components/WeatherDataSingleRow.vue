<script setup>
import WeatherIcon from "./WeatherIcon.vue";

const props = defineProps({
  isActiveRow: Boolean,
  shouldDisplayDate: Boolean,
  day: String,
  min: Number,
  max: Number,
  icon: Number,
});

const emit = defineEmits(["click"]);

const onClick = () => {
  emit("click");
};
</script>

<template>
  <div
    :class="[isActiveRow ? 'item-row-active' : null, 'item-row']"
    @click="onClick"
  >
    <span v-if="shouldDisplayDate">{{ day }}</span>
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
