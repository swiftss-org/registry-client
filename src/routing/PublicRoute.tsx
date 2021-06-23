import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import cookies from '../utils/cookies';
import { __TOKEN__ } from '../utils/constants';
import { CustomRouteProps } from './types';
import urls from './urls';
import Layout from '../pages/Layout';

const PublicRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
  const token = cookies.get(__TOKEN__);

  if (token && rest.path === urls.login()) {
    return <Route {...rest} render={() => <Redirect to={urls.patients()} />} />;
  }

  return <Route {...rest} render={(props: any) => <Layout component={Component} {...props} />} />;
};

export default PublicRoute;
