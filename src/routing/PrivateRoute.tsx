import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import cookies from '../utils/cookies';
import { __TOKEN__ } from '../utils/constants';
import urls from './urls';
import { CustomRouteProps } from './types';
import Layout from 'pages/Layout/Layout';

const PrivateRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
  const token = cookies.get(__TOKEN__);

  if (!token) {
    return <Route {...rest} render={() => <Redirect to={urls.login()} />} />;
  }
  if (rest.path === '/' || !Component) {
    return <Redirect to={urls.patients()} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Route {...rest} render={(props: any) => <Layout component={Component} {...props} />} />;
};

export default PrivateRoute;
