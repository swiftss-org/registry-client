import React from 'react';

import Layout from 'pages/Layout/Layout';
import { Redirect, Route } from 'react-router-dom';

import { CustomRouteProps } from './types';
import urls from './urls';
import { __TOKEN__ } from '../utils/constants';
import { getUserStorageItem } from '../utils/storage';

const PrivateRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
  const token = getUserStorageItem(__TOKEN__);

  if (!token) {
    return <Route {...rest} render={() => <Redirect to={urls.landingPage()} />} />;
  }
  if (rest.path === '/' || !Component) {
    return <Redirect to={urls.patients()} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Route {...rest} render={(props: any) => <Layout component={Component} {...props} />} />;
};

export default PrivateRoute;
