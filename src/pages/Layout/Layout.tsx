/** @jsxImportSource @emotion/react */
import React from 'react';

import { Drawer, IconButton } from '@orfium/ictinus';

import { TopBar } from '../../App.style';
import { useResponsiveLayout } from '../../hooks/useResponsiveSidebar';
import { Header, Main, MainContainer, SideNav } from './Layout.style';

interface Props {
  /** Component to load */
  component?: React.FC;
}

const Layout: React.FC<Props> = (props: Props) => {
  const { responsiveProps, expanded, setExpanded } = useResponsiveLayout();

  return (
    <MainContainer {...responsiveProps}>
      <Header>
        <TopBar>
          <IconButton
            transparent
            size="lg"
            name="menu"
            color="darkGray-200"
            type="primary"
            onClick={() => setExpanded((prevState) => !prevState)}
          />
          <span>Tanzanian MHP Registry</span>
        </TopBar>
      </Header>
      <SideNav>
        <Drawer
          expanded={expanded}
          setExpanded={setExpanded}
          menuItems={[
            {
              name: 'Patient Directory',
              visible: true,
              url: '/patients',
              iconName: 'info',
              options: [],
            },
            {
              name: 'Register Patient',
              visible: true,
              url: '/patients/register',
              iconName: 'info',
              options: [],
            },
            {
              name: 'My Account',
              visible: true,
              url: '/account',
              iconName: 'info',
              options: [],
            },
          ]}
        />
      </SideNav>
      <Main css={{ flexDirection: 'column' }}>{props.component && <props.component />}</Main>
    </MainContainer>
  );
};

export default Layout;
