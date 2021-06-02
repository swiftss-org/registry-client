import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Drawer, IconButton, ThemeProvider } from '@orfium/ictinus';
import { QueryClient, QueryClientProvider } from 'react-query';

import theme from 'theme/globals';
import { AppWrapper, TopBar } from './App.style';
import Routes from './routing/Routes';
import { PageWrapper } from './common.style';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <ThemeProvider theme={{ palette: { branded1: theme.colors.branded1 } }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppWrapper>
            <TopBar>
              <IconButton
                transparent
                size="lg"
                name="menu"
                color="darkGray-200"
                type="primary"
                onClick={() => setIsExpanded((prevState) => !prevState)}
              />
              <span>Tanzanian MHP Registry</span>
            </TopBar>

            <Drawer
              expanded={isExpanded}
              setExpanded={setIsExpanded}
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
            <PageWrapper>
              <Routes />
            </PageWrapper>
          </AppWrapper>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
