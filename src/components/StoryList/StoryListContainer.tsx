import React, { useEffect, useRef, useState } from "react";
import { MAX_PAGE_STORIES } from "../../config";
import { requestStories, useAppDispatch, useAppSelector } from "../../store";
import StoryListView from "./StoryListView";

const StoryListContainer = () => {
  const dispatch = useAppDispatch();
  const [localStories, setLocalStories] = useState<number[]>([]);

  const currentPage = useRef(1);
  const firstLoad = useRef(true);
  const isMoreVisible = useRef(true);
  const isPrevVisible = useRef(false);

  useEffect(() => {
    dispatch(
      requestStories({
        page: currentPage.current,
      })
    );
  }, [dispatch, currentPage.current]);

  const storiesId = useAppSelector((state) => {
    return state.storyReducer.storiesId;
  });

  useEffect(() => {
    if (firstLoad.current) {
      setLocalStories(storiesId.slice(0, 20));
      firstLoad.current = false;
    } else {
      setLocalStories(
        storiesId.slice(
          currentPage.current * MAX_PAGE_STORIES,
          currentPage.current * MAX_PAGE_STORIES + MAX_PAGE_STORIES
        )
      );
    }
  }, [storiesId]);

  const getPaginationOffset = (isPrevious: boolean) => {
    const begin =
      (currentPage.current - (isPrevious ? 1 : 0)) * MAX_PAGE_STORIES;
    const end = begin + MAX_PAGE_STORIES;
    return {
      begin,
      end,
    };
  };

  const nextPageHandler = () => {
    const offset = getPaginationOffset(false);

    const nextPageStories = storiesId.slice(offset.begin, offset.end);
    setLocalStories(nextPageStories);
    currentPage.current = currentPage.current + 1;
    isPrevVisible.current = true;
    if (offset.end >= storiesId.length) {
      isMoreVisible.current = false;
    } else {
      isMoreVisible.current = true;
    }
  };

  const previousPageHandler = () => {
    currentPage.current = currentPage.current - 1;
    if (currentPage.current > 0) {
      const offset = getPaginationOffset(true);
      const previousPageStories = storiesId.slice(offset.begin, offset.end);
      setLocalStories(previousPageStories);
      isMoreVisible.current = true;
      if (currentPage.current === 1) {
        isPrevVisible.current = false;
      } else {
        isPrevVisible.current = true;
      }
    }
  };

  return (
    <StoryListView
      storiesId={localStories}
      currentPage={currentPage.current}
      isMoreButtonVisible={isMoreVisible.current}
      isPreviousButtonVisible={isPrevVisible.current}
      nextPageHandler={nextPageHandler}
      previousPageHandler={previousPageHandler}
    />
  );
};

export default StoryListContainer;
