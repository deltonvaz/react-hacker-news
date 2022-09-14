import styled from "@emotion/styled";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { RefreshIcon } from "../../assets";

export interface IHeader {
  refreshHandler(): void;
}

const StyledHeaderContainer = styled(Grid)({
  backgroundColor: "#f58c23",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 36px",
});

const HeaderView = ({ refreshHandler }: IHeader) => {
  const handleReloadButtonClick = () => {
    refreshHandler();
  };

  return (
    <StyledHeaderContainer container>
      <Grid item>
        <Typography fontWeight="bold">HackerNews</Typography>
      </Grid>
      <Grid item>
        <IconButton
          aria-label="refresh"
          onClick={handleReloadButtonClick}
          color="primary"
        >
          <RefreshIcon />
        </IconButton>
      </Grid>
    </StyledHeaderContainer>
  );
};

export default HeaderView;
