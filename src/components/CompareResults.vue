<script setup>
const props = defineProps({
  result: Number | String,
});

console.log(props.result);
</script>

<template>
  <div>
    <div>{{ result }}</div>
  </div>
</template>

<style scoped></style>
