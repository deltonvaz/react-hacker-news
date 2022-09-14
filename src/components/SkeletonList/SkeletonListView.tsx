import React from "react";

import { Box, Skeleton } from "@mui/material";

interface ISkeletonListView {
  quantity: number;
}

const SkeletonListView = ({ quantity }: ISkeletonListView) => {
  return (
    <>
      {Array(quantity)
        .fill(0)
        .map((id, index) => (
          <Box key={`box-skeleton-list-${index}`}>
            <Skeleton
              animation="wave"
              width="80%"
              key={`title-skeleton-list-${id}`}
            />
            <Skeleton
              animation="wave"
              width="50%"
              key={`subtitle-skeleton-list-${id}`}
            />
          </Box>
        ))}
    </>
  );
};

export default SkeletonListView;
