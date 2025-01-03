import { useQuery } from "@tanstack/vue-query";
import { computed, unref } from "vue";

const apiKey = import.meta.env.VITE_METEOSOURCE_KEY;
const fetcher = async (queryString) =>
  await fetch(
    `https://www.meteosource.com/api/v1/free/find_places?text=${queryString}&key=${apiKey}`
  ).then((response) => response.json());

export const usePlaceQuery = (placeRef, initiator) => {
  // TODO: double-check if we really need unref here
  const fetchMe = computed(() => unref(placeRef));
  const isEnabled = computed(() => {
    console.log("fetchMe.value:", fetchMe.value);
    return !!fetchMe.value && fetchMe.value.length > 2;
  });

  const query = useQuery({
    queryKey: ["find_place", initiator, fetchMe],
    queryFn: () => fetcher(fetchMe.value),
    enabled: isEnabled,
  });

  console.log("Fetched Data in query:", query.data.value);

  return {
    placeData: computed(() => query.data.value || []),
    placeRefetch: query.refetch,
    /* placeIsFetching: computed(() => query.isFetching.value),
    placeIsError: computed(() => query.isError.value), */
  };
};
