import React, { useEffect } from "react";
import { requestStoriesId, useAppDispatch, useAppSelector } from "../../store";
import AppContentView from "./AppContentView";

const AppContentContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestStoriesId({ type: "top" }));
  }, []);

  const isLoading = useAppSelector<boolean>((state) => {
    return state.storyReducer.storiesIdFetchStatus !== "idle";
  });

  return <AppContentView isLoading={isLoading} />;
};

export default AppContentContainer;
