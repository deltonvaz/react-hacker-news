import React from "react";
import styled from "@emotion/styled";
import { Grid, Typography, ListItem, Link } from "@mui/material";
import { IStory } from "../../api/interfaces";
import SkeletonList from "../SkeletonList";

export type StoryPost = Pick<
  Required<IStory>,
  "by" | "descendants" | "id" | "score" | "title" | "url"
> & {
  formatedTime: string;
};

export interface IStoryView {
  storyPost?: StoryPost;
  index: number;
}

const Title = styled(Link)({
  fontSize: 12,
  color: "#000000",
});

const StyledGrid = styled(Grid)({
  "& .MuiTypography-root": {
    display: "inline",
    textDecoration: "none",
  },
});

const StyledTypography = styled(Typography)({
  fontSize: 11,
  color: "#828282",
  overflowWrap: "break-word",
  "& a": {
    color: "#828282",
  },
});

const StoryView = ({ storyPost, index }: IStoryView) => {
  if (storyPost) {
    const { by, descendants, id, score, formatedTime, title, url } = storyPost;
    return (
      <ListItem divider disablePadding>
        <StyledGrid container spacing={0.5} wrap="nowrap">
          <Grid item>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <StyledTypography>{`${index}.`}</StyledTypography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container direction="column">
              <Grid item xs zeroMinWidth>
                <Title href={url} target="_blank">
                  {title}
                </Title>
                <StyledTypography>
                  <Link
                    href={`https://news.ycombinator.com/from?site=${url}`}
                    target="_blank"
                  >
                    {` (${url})`}
                  </Link>
                </StyledTypography>
              </Grid>
              <Grid item xs zeroMinWidth>
                <StyledTypography>
                  {`${score} points by `}
                  <Link
                    href={`https://news.ycombinator.com/user?id=${by}`}
                    target="_blank"
                  >
                    {by}
                  </Link>
                  {`${formatedTime} | `}
                  <Link
                    href={`https://news.ycombinator.com/item?id=${id}`}
                    target="_blank"
                  >
                    {`${descendants} comments `}
                  </Link>
                </StyledTypography>
              </Grid>
            </Grid>
          </Grid>
        </StyledGrid>
      </ListItem>
    );
  } else {
    return <SkeletonList quantity={1} />;
  }
};

export default StoryView;
