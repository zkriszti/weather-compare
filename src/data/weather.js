import { useQuery } from "@tanstack/vue-query";
import { computed, unref } from "vue";

const apiKey = import.meta.env.VITE_METEOSOURCE_KEY;
// the below line gives function size error in vue-mess-detector
const fetcher = async (cityId) =>
  await fetch(
    `https://www.meteosource.com/api/v1/free/point?place_id=${cityId}&sections=daily&language=en&units=metric&key=${apiKey}`
  ).then((response) => response.json());

export const useWeatherQuery = (cityRef, initiator) => {
  // TODO: double-check if we really need unref here
  const fetchMe = computed(() => unref(cityRef)?.id);
  const isEnabled = computed(() => !!fetchMe.value);

  const query = useQuery({
    queryKey: ["weather", initiator, fetchMe],
    queryFn: () => fetcher(fetchMe.value),
    enabled: isEnabled,
  });

  return {
    weatherData: computed(() => query.data.value),
    weatherIsFetching: computed(() => query.isFetching.value),
    weatherIsError: computed(() => query.isError.value),
    weatherRefetch: query.refetch,
    weatherIsSuccess: computed(() => query.isSuccess.value),
  };
};
