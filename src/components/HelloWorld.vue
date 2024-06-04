<script setup>
import { useQuery } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import  WeatherIcon  from './WeatherIcon.vue'

const apiKey = import.meta.env.VITE_METEOSOURCE_KEY
const fetcher = async () =>
  await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=budapest&sections=daily&language=en&units=metric&key=${apiKey}`).then((response) =>
    response.json(),
  )
const { isPending, isError, isFetching, data, error, refetch } = useQuery({
  queryKey: ['weather'],
  queryFn: fetcher,
})
</script>

<template>
  <VueQueryDevtools />
  <div class="items-list">
    <template v-for="item in data.value.daily.data">
      <span>{{item.day}}</span>
      <span>{{item.weather}}</span>
      <WeatherIcon :icon="item.icon" />
    </template>
  </div>  
</template>

<style scoped>
.items-list {
  display: grid;
  grid-template-columns: repeat(3, auto);
}
</style>
