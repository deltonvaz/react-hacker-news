import * as React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as WindyStrongSVG } from "../svg/renew.svg";

const RefreshIcon: React.ComponentType<SvgIconProps> = (props) => (
  <SvgIcon {...props} component={WindyStrongSVG} viewBox="0 0 32 32" />
);

export default RefreshIcon;
