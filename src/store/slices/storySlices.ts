import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStoriesIdByType,
  getStoriesUpdate,
  getStory,
  IStoriesRequestIdsByType,
  IStory,
  IStoryType,
} from "../../api";
import { MAX_PAGE_STORIES } from "../../config";
import { storySelectors } from "../selectors/storySelectors";
import { AppDispatch, RootState } from "../store";

export type FetchStatus = "idle" | "loading" | "failed";

type IStoryState = {
  stories: {
    [id: number]: IStory;
  };
  storiesId: number[];
  fetchStatus: FetchStatus;
  storiesIdFetchStatus: FetchStatus;
};

const initialState: IStoryState = {
  stories: {},
  fetchStatus: "idle",
  storiesId: [],
  storiesIdFetchStatus: "idle",
};

// Slice

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Request story
    builder.addCase(requestStory.fulfilled, (state, action) => {
      state.stories = {
        ...state.stories,
        [action.payload.id]: action.payload,
      };
      state.fetchStatus = "idle";
    });
    builder.addCase(requestStory.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(requestStory.rejected, (state) => {
      state.fetchStatus = "failed";
    });

    // Request Stories IDs
    builder.addCase(requestStoriesId.fulfilled, (state, action) => {
      state.storiesId = action.payload;
      state.storiesIdFetchStatus = "idle";
    });
    builder.addCase(requestStoriesId.pending, (state) => {
      state.storiesIdFetchStatus = "loading";
    });
    builder.addCase(requestStoriesId.rejected, (state) => {
      state.storiesIdFetchStatus = "failed";
    });

    // Request Stories
    builder.addCase(requestStories.fulfilled, (state, action) => {
      const { stories } = state;
      const payloadStories = action.payload.reduce(
        (acc, story) => {
          return {
            ...acc,
            [story.id]: story,
          };
        },
        { ...stories }
      );
      state.stories = payloadStories;
      state.fetchStatus = "idle";
    });
    builder.addCase(requestStories.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(requestStories.rejected, (state) => {
      state.fetchStatus = "failed";
    });

    // Request Stories
    builder.addCase(requestUpdate.fulfilled, (state, action) => {
      const payloadStories = action.payload.reduce((acc, story) => {
        return {
          ...acc,
          [story.id]: story,
        };
      }, {});

      state.stories = {
        ...state.stories,
        ...payloadStories,
      };
      state.fetchStatus = "idle";
    });
    builder.addCase(requestUpdate.pending, (state) => {
      state.fetchStatus = "loading";
    });
    builder.addCase(requestUpdate.rejected, (state) => {
      state.fetchStatus = "failed";
    });
  },
});

// Thunks

export const requestStory = createAsyncThunk<
  IStory,
  number,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "story/fetchById",
  async (payload: number) => {
    const story = await getStory(payload);
    return story.data;
  },
  {
    condition: (id: number, { getState }) => {
      const state = getState();
      const hasValue = Object.keys(state.storyReducer.stories).includes(
        String(id)
      );
      return !hasValue;
    },
  }
);

export const requestStoriesId = createAsyncThunk<
  number[],
  IStoriesRequestIdsByType,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "story/fetchStoriesId",
  async (payload: IStoriesRequestIdsByType) => {
    const stories = await getStoriesIdByType(payload);
    return stories.data;
  },
  {
    condition: (_param, { getState }) => {
      const state = getState();
      const retval = state.storyReducer.storiesIdFetchStatus !== "idle";
      return !retval;
    },
  }
);

type IParams = {
  page: number;
  type?: IStoryType;
  useCache?: boolean;
};

export const requestStories = createAsyncThunk<
  IStory[],
  IParams,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "story/fetchStories",
  async (params: IParams, api) => {
    try {
      const { page } = params;
      let storiesId = storySelectors.getStoriesId(api.getState());

      if (storiesId.length === 0) {
        const ids = await getStoriesIdByType({
          type: "top",
        });
        storiesId = ids.data;
      }
      const promissesToResolve = storiesId
        .slice(
          page * MAX_PAGE_STORIES,
          page * MAX_PAGE_STORIES + MAX_PAGE_STORIES
        )
        .map(getStory);
      const stories = await Promise.all(promissesToResolve);

      const retVal = stories.map((payload) => {
        const { data } = payload;
        return data;
      });
      return retVal;
    } catch (error) {
      throw Error(error as string);
    }
  },
  {
    condition: ({ useCache }, { getState }) => {
      if (useCache && !useCache) return true;
      const state = getState();
      const storiesId = storySelectors.getStoriesId(state);

      if (storiesId.length === 0) {
        return true;
      }
      return false;
    },
  }
);

export const requestUpdate = createAsyncThunk<
  IStory[],
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("story/updateStories", async (_params, api) => {
  try {
    const storiesUpdate = await getStoriesUpdate();

    const state = api.getState();

    const promissesToResolve = [];

    for (const id of storiesUpdate.data.items) {
      if (Object.keys(state.storyReducer.stories).includes(String(id))) {
        promissesToResolve.push(getStory(id));
      }
    }

    const stories = await Promise.all(promissesToResolve);

    const retVal = stories.map((payload) => {
      const { data } = payload;
      return data;
    });

    return retVal;
  } catch (error) {
    throw Error(error as string);
  }
});

export default storySlice.reducer;
