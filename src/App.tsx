import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppWrapper } from './App.style';
import { useResponsiveLayout } from './hooks/useResponsiveSidebar';
import NotificationsProvider from './providers/Notifications/NotificationProvider';
import Routes from './routing/Routes';
import theme from './theme/theme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, refetchOnReconnect: false } },
});

const App: React.FC = () => {
  const { isDesktop } = useResponsiveLayout();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          <AppWrapper isDesktop={isDesktop}>
              <Routes />
            </AppWrapper>
        </NotificationsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
