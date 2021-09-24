import React from 'react';

import { ThemeProvider } from '@orfium/ictinus';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppWrapper } from './App.style';
import Routes from './routing/Routes';
import { themeOverride } from './theme/globals';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnReconnect: false } },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeOverride}>
        <Router>
          <AppWrapper>
            <Routes />
          </AppWrapper>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
