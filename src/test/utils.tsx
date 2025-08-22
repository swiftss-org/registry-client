import React, { FC, PropsWithChildren } from 'react';


import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import cookies from 'utils/cookies';

import theme from '../theme/theme';
import { __TOKEN__ } from '../utils/constants';
export const LOGIN_TOKEN_MOCK = 'test-token';

export const MockProviders: FC<PropsWithChildren> = ({ children }) => (
  <Router>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Router>
);

const renderWithProviders = (children: React.ReactNode, fakeLogin = false) => {
  // logout on render
  cookies.remove(__TOKEN__);

  if (fakeLogin) {
    cookies.set(__TOKEN__, LOGIN_TOKEN_MOCK);
  }

  return render(<MockProviders>{children}</MockProviders>);
};

export default renderWithProviders;
