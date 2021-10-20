/** @jsxImportSource @emotion/react */
import React from 'react';

import { IconButton } from '@orfium/ictinus';
import { TopBar } from 'App.style';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';

import Drawer from '../../components/Drawer';
import { Header, Main, MainContainer, SideNav } from './Layout.style';

interface Props {
  /** Component to load */
  component?: React.FC;
}

const Layout: React.FC<Props> = ({ component: Component }) => {
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
              options: [],
            },
            {
              name: 'Register Patient',
              visible: true,
              url: '/patients/register',
              options: [],
            },
            {
              name: 'My Account',
              visible: true,
              url: '/account',
              options: [],
            },
          ]}
        />
      </SideNav>
      <Main css={{ flexDirection: 'column' }}>{Component && <Component />}</Main>
    </MainContainer>
  );
};

export default Layout;
