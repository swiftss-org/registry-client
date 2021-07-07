import React from 'react';

import { ThemeProvider } from '@orfium/ictinus';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppWrapper } from './App.style';
import Routes from './routing/Routes';
import theme from 'theme/globals';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnReconnect: false } },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={{ palette: { branded1: theme.colors.branded1 } }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppWrapper>
            <Routes />
          </AppWrapper>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
