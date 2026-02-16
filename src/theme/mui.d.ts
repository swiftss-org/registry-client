import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    des1200: true;
    des1366: true;
    des1440: true;
    des1920: true;
  }
}
