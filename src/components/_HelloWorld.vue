<script setup>
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

defineProps({
  msg: String,
})

const apiKey = import.meta.env.VITE_METEOSOURCE_KEY
const fetcher = async () =>
  await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=budapest&sections=daily&language=en&units=metric&key=${apiKey}`).then((response) =>
    response.json(),
  )
const { isPending, isError, isFetching, data, error, refetch } = useQuery({
  queryKey: ['weather'],
  queryFn: fetcher,
})



const count = ref(0)

console.log(isError, data)

</script>

<template>
  <h1>{{ msg }}</h1>
  <VueQueryDevtools />
  <div class="card">
  <button type="button" @click="count--">-</button>
  <div :class="{'colored': count > 3}" class="box">count is {{ count }}</div>
  <button type="button" @click="count++">+</button>
  </div>
  <div v-for="item in data.daily.data">{{item.day}} {{item.weather}}</div>
  
</template>

<style scoped>
.card {
  display: flex; 
  gap: 8px;
  justify-content: center;
}
.read-the-docs {
  color: #888;
}
.box {
  display: flex;
  align-items: center;
  padding: 0 12px;
}
.colored {
  background: wheat;
}
</style>
