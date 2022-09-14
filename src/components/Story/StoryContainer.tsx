import moment from "moment";
import React, { useEffect, useState } from "react";
import { requestStory, useAppDispatch, useAppSelector } from "../../store";
import StoryView, { IStoryView, StoryPost } from "./StoryView";

const StoryContainer = ({
  storyId,
  index,
}: IStoryView & { storyId: number }) => {
  const dispatch = useAppDispatch();
  const [storyPost, setStoryPost] = useState<StoryPost>();

  useEffect(() => {
    dispatch(requestStory(storyId));
  }, [storyId]);

  const story = useAppSelector((state) => {
    return state.storyReducer.stories[storyId] ?? undefined;
  });

  useEffect(() => {
    if (story) {
      const storyTime = story.time && story.time * 1000;
      const date = new Date(storyTime ?? 1);
      const formatedTime = moment(date, "YYYYMMDD").fromNow();

      const storyPost: StoryPost = {
        by: story?.by ?? "",
        descendants: story?.descendants ?? 0,
        formatedTime,
        id: story.id,
        score: story?.score ?? 0,
        title: story?.title ?? "",
        url: story?.url ?? "",
      };

      setStoryPost(storyPost);
    }
  }, [story]);

  return <StoryView storyPost={storyPost} index={index} />;
};

export default StoryContainer;
