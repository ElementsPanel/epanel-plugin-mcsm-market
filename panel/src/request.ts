import axios, { type AxiosRequestConfig } from "axios";
import { ref, type Ref } from "vue";
import { getUserInfo } from "./host";

// A private client keeps authentication on panel calls and out of catalogue imports.
const client = axios.create();
interface RequestConfig extends AxiosRequestConfig {
  forceRequest?: boolean;
}

export function useDefineApi<P, T>(baseConfig: RequestConfig) {
  return () => {
    const state = ref<T>() as Ref<T | undefined>;
    const isLoading = ref(false);
    const isReady = ref(false);
    let latestRequest = 0;
    const execute = async (config?: P & RequestConfig): Promise<Ref<T | undefined>> => {
      const request = ++latestRequest;
      isLoading.value = true;
      isReady.value = false;
      try {
        const options = { ...baseConfig, ...config };
        const info = await getUserInfo(options.signal as AbortSignal | undefined);
        const response = await client.request<{ status: number; data: T }>({
          timeout: 30_000,
          ...options,
          url: options.url?.startsWith("/") ? `.${options.url}` : options.url,
          headers: {
            ...options.headers,
            "X-Requested-With": "XMLHttpRequest",
            ...(info?.token ? { Authorization: `Bearer ${info.token}` } : {})
          }
        });
        if (response.data?.status !== 200) throw new Error(String(response.data?.data));
        const result = response.data.data;
        if (request === latestRequest) {
          state.value = result;
          isReady.value = true;
        }
        return ref(result) as Ref<T>;
      } finally {
        if (request === latestRequest) isLoading.value = false;
      }
    };
    return { state, isLoading, isReady, execute };
  };
}
