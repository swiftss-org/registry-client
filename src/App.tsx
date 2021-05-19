import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@orfium/ictinus';

import theme from 'theme/globals';
import { AppWrapper } from './App.style';
import Routes from './routing/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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
