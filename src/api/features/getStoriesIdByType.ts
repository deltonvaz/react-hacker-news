import { AxiosRequestConfig } from "axios";
import { BASE_API_URL } from "../../config";
import { IStoryType } from "../interfaces";
import { doGetRequest } from "./doGetRequest";

const getStoriesConfig = (
  payload: IStoriesRequestIdsByType
): AxiosRequestConfig => ({
  url: `${BASE_API_URL}//${payload.type}stories.json`,
  method: "GET",
});

export interface IStoriesRequestIdsByType {
  type: IStoryType;
}

export type IStoriesResponse = number[];

export const getStoriesIdByType = (payload: IStoriesRequestIdsByType) => {
  return doGetRequest<IStoriesResponse>(getStoriesConfig(payload));
};
