/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { IconButton } from '@orfium/ictinus';
import { TopBar } from 'App.style';
import { useResponsiveLayout } from 'hooks/useResponsiveSidebar';
import { debounce } from 'lodash';
import { useHistory } from 'react-router';

import Drawer from '../../components/Drawer';
import SearchField from '../../components/SearchField';
import { Header, Main, MainContainer, SideNav } from './Layout.style';

interface Props {
  /** Component to load */
  component?: React.FC<{ searchTerm?: string }>;
}

const Layout: React.FC<Props> = ({ component: Component }) => {
  const { responsiveProps, expanded, setExpanded } = useResponsiveLayout();
  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

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
          {history.location.pathname === '/patients' && (
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
            // {
            //   name: 'My Account',
            //   visible: true,
            //   url: '/account',
            //   options: [],
            // },
          ]}
        />
      </SideNav>
      <Main css={{ flexDirection: 'column' }}>
        {Component && <Component searchTerm={searchTerm} />}
      </Main>
    </MainContainer>
  );
};

export default Layout;
