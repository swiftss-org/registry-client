import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import cookies from '../utils/cookies';
import { __TOKEN__ } from '../utils/constants';
import urls from './urls';
import { CustomRouteProps } from './types';

const PrivateRoute: React.FC<CustomRouteProps> = ({
  component: Component,
  disabled = false,
  ...rest
}) => {
  const token = cookies.get(__TOKEN__);

  if (!token) {
    return <Route {...rest} render={() => <Redirect to={urls.defaultPublic()} />} />;
  }
  if (rest.path === '/' || !Component) {
    return <Redirect to={urls.defaultPrivate()} />;
  }

  if (disabled) {
    return <Route {...rest} render={() => <span>This page is not available yet</span>} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Route {...rest} render={(props: any) => <Component {...props} />} />;
};

export default PrivateRoute;
