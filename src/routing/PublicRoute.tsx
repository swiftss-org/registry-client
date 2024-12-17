import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import Layout from '../pages/Layout';
import { __TOKEN__ } from '../utils/constants';
import { getUserStorageItem } from '../utils/storage';
import { CustomRouteProps } from './types';
import urls from './urls';

const PublicRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
  const token = getUserStorageItem(__TOKEN__);

  if (token && rest.path === urls.login()) {
    return <Route {...rest} render={() => <Redirect to={urls.landingPage()} />} />;
  }

  return (
    <Route {...rest} render={(props: unknown) => <Layout component={Component} {...props} />} />
  );
};

export default PublicRoute;
