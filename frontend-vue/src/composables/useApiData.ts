import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export function useApiData<T>(fetcher: (signal?: AbortSignal) => Promise<T[]>) {
  const data: Ref<T[]> = ref([]) as Ref<T[]>;
  const loading = ref(true);
  const error = ref<string | null>(null);

  let controller: AbortController;

  onMounted(() => {
    controller = new AbortController();
    fetcher(controller.signal)
      .then((result) => { data.value = result; })
      .catch((err) => {
        if (err.name !== 'CanceledError') error.value = err.message;
      })
      .finally(() => { loading.value = false; });
  });

  onUnmounted(() => {
    controller?.abort();
  });

  return { data, loading, error };
}
