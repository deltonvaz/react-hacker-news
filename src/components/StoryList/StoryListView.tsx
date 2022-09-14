import React from "react";
import styled from "@emotion/styled";
import { Button, ButtonGroup, List, ListItem } from "@mui/material";

import Story from "../Story";

export interface IStoryList {
  storiesId: number[];
  currentPage: number;
  nextPageHandler(): void;
  previousPageHandler(): void;
  isPreviousButtonVisible: boolean;
  isMoreButtonVisible: boolean;
}

const StyledList = styled(List)({
  width: "100%",
  backgroundColor: "white",
});

const StyledButton = styled(Button)({
  color: "primary",
  fontSize: 11,
});

const StoryListView = ({
  storiesId,
  currentPage,
  nextPageHandler,
  previousPageHandler,
  isPreviousButtonVisible,
  isMoreButtonVisible,
}: IStoryList) => {
  const basePost = (currentPage - 1) * 20;
  return (
    <>
      <StyledList>
        {storiesId.map((storyId, index) => {
          return (
            <Story
              key={storyId}
              storyId={storyId}
              index={basePost + (index + 1)}
            />
          );
        })}
        <ListItem>
          <ButtonGroup variant="text" color="primary">
            {isPreviousButtonVisible && (
              <StyledButton
                hidden={!isPreviousButtonVisible}
                onClick={previousPageHandler}
              >
                Prev
              </StyledButton>
            )}

            {isMoreButtonVisible && (
              <StyledButton onClick={nextPageHandler}>More</StyledButton>
            )}
          </ButtonGroup>
        </ListItem>
      </StyledList>
    </>
  );
};

export default StoryListView;
