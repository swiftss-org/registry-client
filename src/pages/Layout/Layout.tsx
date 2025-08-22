/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { TopBar } from 'App.style';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { debounce } from 'lodash';
import { useLocation } from 'react-router';

import { Header, Main, MainContainer, SideNav } from './Layout.style';
import Drawer from '../../components/Drawer';
import SearchField from '../../components/SearchField';

interface Props {
  /** Component to load */
  component?: React.FC<{ searchTerm?: string }>;
}

const Layout: React.FC<Props> = ({ component: Component }) => {
  const { responsiveProps, expanded, setExpanded, isDesktop } = useResponsiveLayout();
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <MainContainer {...responsiveProps} isDesktop={isDesktop}>
      <Header>
        <TopBar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setExpanded((prevState) => !prevState)}
          >
            <MenuIcon />
          </IconButton>
          {location.pathname === '/patients' && (
            <SearchField
              placeholder={'Search by name, gender, patient ID...'}
              onSearch={debounce(handleSearchTerm, 200)}
            />
          )}
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
              name: 'Dashboard',
              visible: true,
              url: '/patients/landing',
              options: [],
            },
            // {
            //   name: 'My Account',
            //   visible: true,
            //   url: '/account',
            //   options: [],
            // },
          ]}
        />
      </SideNav>
      <Main isDesktop={isDesktop} css={{ flexDirection: 'column' }}>
        {Component && <Component searchTerm={searchTerm} />}
      </Main>
    </MainContainer>
  );
};

export default Layout;
