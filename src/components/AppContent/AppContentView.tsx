import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import SkeletonList from "../SkeletonList";
import StoryList from "../StoryList";
import { MAX_PAGE_STORIES } from "../../config";

export interface IAppContentView {
  isLoading: boolean;
}

const StyledBox = styled(Box)({
  padding: "0 24px",
  backgroundColor: "#ededed",
  height: "100%",
});

const AppContentView = ({ isLoading }: IAppContentView) => {
  return (
    <StyledBox>
      {isLoading ? <SkeletonList quantity={MAX_PAGE_STORIES} /> : <StoryList />}
    </StyledBox>
  );
};

export default AppContentView;
