import { AxiosRequestConfig } from "axios";
import { BASE_API_URL } from "../../config";
import { doGetRequest } from "./doGetRequest";

const getStoryConfig = (): AxiosRequestConfig => ({
  url: `${BASE_API_URL}/updates.json`,
  method: "GET",
});

export type IUpdateResponse = {
  items: number[];
  profiles: string[];
};

export const getStoriesUpdate = () => {
  return doGetRequest<IUpdateResponse>(getStoryConfig());
};
