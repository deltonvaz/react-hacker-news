import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const doGetRequest = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const instance = axios.create();
  return instance.request<T>({
    ...config,
  });
};
