import React, { FC } from 'react';

import { ThemeProvider as OrfiumThemeProvider } from '@orfium/ictinus';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import cookies from 'utils/cookies';

import { __TOKEN__ } from '../utils/constants';
export const LOGIN_TOKEN_MOCK = 'test-token';

export const MockProviders: FC = ({ children }) => (
  <Router>
    <OrfiumThemeProvider theme={{}}>{children}</OrfiumThemeProvider>
  </Router>
);

const renderWithProviders = (children: JSX.Element, fakeLogin = false) => {
  // logout on render
  cookies.remove(__TOKEN__);

  if (fakeLogin) {
    cookies.set(__TOKEN__, LOGIN_TOKEN_MOCK);
  }

  return render(<MockProviders>{children}</MockProviders>);
};

export default renderWithProviders;
