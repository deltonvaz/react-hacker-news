import { AxiosRequestConfig } from "axios";
import { BASE_API_URL } from "../../config";
import { IStory } from "../interfaces";
import { doGetRequest } from "./doGetRequest";

const getStoryConfig = (id: number): AxiosRequestConfig => ({
  url: `${BASE_API_URL}/item/${id}.json`,
  method: "GET",
});

export type IStoryResponse = IStory;

export const getStory = (id: number) => {
  return doGetRequest<IStoryResponse>(getStoryConfig(id));
};
