import React from 'react';

import Layout from 'pages/Layout/Layout';
import { Redirect, Route } from 'react-router-dom';

import { CustomRouteProps } from './types';
import urls from './urls';
import { __TOKEN__ } from '../utils/constants';
import { getUserStorageItem } from '../utils/storage';

const PrivateRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
  const token = getUserStorageItem(__TOKEN__);
  const level = getUserStorageItem('user_level');

  if (!token) {
    return <Route {...rest} render={() => <Redirect to={urls.login()} />} />;
  }
  if (rest.path === '/' || !Component) {
    return <Redirect to={urls.patients()} />;
  }

  if (rest.path === '/nationalKPIs' && level !== 'NATIONAL_LEAD') {
    return <Redirect to={urls.landingPage()} />; // redirect unauthorized users
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Route {...rest} render={(props: any) => <Layout component={Component} {...props} />} />;
};

export default PrivateRoute;
