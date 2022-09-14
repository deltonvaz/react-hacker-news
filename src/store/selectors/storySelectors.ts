import { RootState } from "../store";

function getStoriesId(state: RootState): number[] {
  return state.storyReducer.storiesId;
}

export const storySelectors = {
  getStoriesId,
};
