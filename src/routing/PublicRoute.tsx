import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import cookies from '../utils/cookies';
import { __TOKEN__ } from '../utils/constants';
import { CustomRouteProps } from './types';
import urls from './urls';

const PublicRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
  const token = cookies.get(__TOKEN__);
  return (
    <Route
      {...rest}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={(props: any) =>
        !token ? <Component {...props} /> : <Redirect to={urls.defaultPublic()} />
      }
    />
  );
};

export default PublicRoute;
