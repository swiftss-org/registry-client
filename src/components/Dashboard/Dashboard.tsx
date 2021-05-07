import React, { FC, useMemo } from 'react';
import TopAppBar from '@orfium/ictinus/dist/components/TopAppBar';
import { GridContainer, Header, Main, SideNav } from './Dashboard.style';
import { Drawer } from '@orfium/ictinus';
import { LogoPlaceholder } from '@orfium/ictinus/dist/components/TopAppBar/components';
import { pageUtils } from '../../config/utils';
import { PageOption } from '../../config/types';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';

/**
 * TODO: Replace dummy implementation of userMenu.
 */
const userConfig = {
  items: ['Logout'],
  userName: 'User',
  userAvatar: { src: '', letter: '' },
  onSelect: () => {
    void 0;
  },
};

interface Props {
  pageOptions: PageOption[];
}
const DashboardLayout: FC<Props> = ({ pageOptions, children }) => {
  const { responsiveProps, expanded, setExpanded, toggle } = useResponsiveLayout();
  const utils = pageUtils(pageOptions);
  const menu = useMemo(() => utils.mapPagesToMenuItems(), [utils]);

  return (
    <>
      <GridContainer {...responsiveProps}>
        <Header>
          <TopAppBar
            logoIcon={<LogoPlaceholder />}
            onMenuIconClick={toggle}
            userMenu={userConfig}
          />
        </Header>
        <SideNav {...responsiveProps}>
          <Drawer setExpanded={setExpanded} expanded={expanded} menuItems={menu} />
        </SideNav>

        <Main>{children}</Main>
      </GridContainer>
    </>
  );
};

export default DashboardLayout;
