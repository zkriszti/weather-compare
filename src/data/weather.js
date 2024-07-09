import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const apiKey = import.meta.env.VITE_METEOSOURCE_KEY

const fetcher = async (cityId) =>
  await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=${cityId}&sections=daily&language=en&units=metric&key=${apiKey}`).then((response) =>
    response.json(),
  )

export const useWeatherQuery = (cities) => {
  // console.log(city.value)
  console.log(cities)
  const fetchMe = computed(() => cities.value[0]?.id || "budapest");
  const { data, isFetching, isError } = useQuery({
    enabled: true,
    queryKey: [computed(() => [`weather-${fetchMe.value}`])],
    queryFn: () => fetcher(fetchMe.value),
  })

  return { weatherData: data, weatherIsFetching: isFetching, weatherIsError: isError };
}



