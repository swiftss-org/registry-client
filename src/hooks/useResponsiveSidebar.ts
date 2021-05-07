import { useEffect, useState } from 'react';
import useBreakpoints from '@orfium/ictinus/dist/hooks/useBreakpoints';

export const useResponsiveLayout = () => {
  const [expanded, setExpanded] = useState(true);
  const breakpoints = useBreakpoints();
  useEffect(() => {
    setExpanded(breakpoints.des1440);
  }, [breakpoints]);

  const toggle = () => {
    setExpanded((prev) => !prev);
  };

  const responsiveProps = {
    isSmallDesktop: breakpoints.des1200 && !breakpoints.des1440,
    isLargeDesktop: breakpoints.des1440,
  };

  return {
    responsiveProps,
    expanded,
    setExpanded,
    toggle,
  };
};
