import React from 'react';

import Layout from 'pages/Layout/Layout';
import { Redirect, Route } from 'react-router-dom';

import { __TOKEN__ } from '../utils/constants';
import { getUserStorageItem } from '../utils/storage';
import { CustomRouteProps } from './types';
import urls from './urls';

const PrivateRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
  const token = getUserStorageItem(__TOKEN__);
  const isStaff = getUserStorageItem('is_staff') === 'true';
  const isSuperuser = getUserStorageItem('is_superuser') === 'true';
  const username = getUserStorageItem('username');

  if (!token) {
    return <Route {...rest} render={() => <Redirect to={urls.login()} />} />;
  }
  if (rest.path === '/' || !Component) {
    return <Redirect to={urls.patients()} />;
  }

  if (rest.path === '/globalKPIs' && !( (isStaff || isSuperuser) && username == 'admin')) {
    return <Redirect to={urls.landingPage()} />; // redirect unauthorized users
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Route {...rest} render={(props: any) => <Layout component={Component} {...props} />} />;
};

export default PrivateRoute;
