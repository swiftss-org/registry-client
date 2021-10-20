import React from 'react';

import { useBreakpoints } from '@orfium/ictinus';

import { Container } from './Drawer.style';
import Navigation from './Navigation/Navigation';
import { MenuItem } from './types';

export type Props = {
  /** Defines if the drawer is expanded */
  expanded: boolean;
  /** Changes if the drawer is expanded */
  setExpanded: (v: boolean) => void;
  /** The menu items to be displayed in the drawer */
  menuItems: MenuItem[];
};

const Drawer: React.FC<Props> = (props) => {
  const breakpoints = useBreakpoints();
  const isSmallDesktop = breakpoints.des1200 && !breakpoints.des1440;

  return (
    <Container
      expanded={props.expanded}
      isDesktop={breakpoints.des1200}
      isSmallDesktop={!breakpoints.des1440}
      onMouseEnter={() => isSmallDesktop && props.setExpanded(true)}
      onMouseLeave={() => isSmallDesktop && props.setExpanded(false)}
    >
      <Navigation {...props} />
    </Container>
  );
};

export default Drawer;
