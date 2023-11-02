import * as React from 'react';
import styled from "styled-components";
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette?.error.main,
    color: theme.palette?.error.contrastText,
  },
}));