<script setup>

defineProps({
  icon: Number
})

const iconUrl = new URL(`./weather_icons/${icon}.png`, import.meta.url).href

</script>

<template>
  <img :src="iconUrl" alt="">
</template>

<style scoped>

</style>
