import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref, unref } from "vue";

const apiKey = import.meta.env.VITE_METEOSOURCE_KEY;
// the below line gives function size error in vue-mess-detector
const fetcher = async (cityId) =>
  await fetch(
    `https://www.meteosource.com/api/v1/free/point?place_id=${cityId}&sections=daily&language=en&units=metric&key=${apiKey}`
  ).then((response) => response.json());

/* export const useWeatherQuery = (city, initiator) => {
  console.log("STEP-1 --- city passed to query:", city?.value);
  const fetchMe = computed(() => city?.id);
  const isEnabled = computed(() => !!fetchMe.value);

  console.log("STEP-2 ---", {
    fetchMe: fetchMe?.value,
    isEnabled: isEnabled?.value,
    initiator: initiator,
  });

  const { data, isFetching, isError, refetch, isSuccess } = useQuery({
    enabled: isEnabled?.value, // !!fetchMe.value,
    queryKey: ["weather", initiator, fetchMe?.value],
    queryFn: () => fetcher(fetchMe?.value),
  });

  return {
    weatherData: data,
    weatherIsFetching: isFetching,
    weatherIsError: isError,
    weatherRefetch: refetch,
    weatherIsSuccess: isSuccess,
  };
}; */

export const useWeatherQuery = (cityRef, initiator) => {
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
