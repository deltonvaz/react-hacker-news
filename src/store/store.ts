import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storySlices from "./slices/storySlices";

export const store = configureStore({
  devTools: {
    name: "HackerNews",
  },
  reducer: {
    storyReducer: storySlices,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
