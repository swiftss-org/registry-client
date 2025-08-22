import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useResponsiveLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('des1200'));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between('des1200', 'des1366'));
  const isMediumDesktop = useMediaQuery(theme.breakpoints.between('des1366', 'des1440'));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.between('des1440', 'des1920'));
  const isXLargeDesktop = useMediaQuery(theme.breakpoints.up('des1920'));

  useEffect(() => {
    setExpanded(isLargeDesktop);
  }, [isLargeDesktop]);

  const toggle = () => {
    setExpanded((prev) => !prev);
  };

  const responsiveProps = {
    isSmallDesktop,
    isMediumDesktop,
    isLargeDesktop,
    isXLargeDesktop,
  };

  return {
    responsiveProps,
    expanded,
    isDesktop,
    setExpanded,
    toggle,
  };
};
