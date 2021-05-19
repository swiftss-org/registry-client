import React from 'react';
import { Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import urls from './urls';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import PatientDirectory from 'pages/PatientDirectory';

const Routes: React.FC = () => (
  <Switch>
    <PublicRoute exact path={urls.login()} component={Login} />
    <PrivateRoute exact path={[urls.patients(), '/']} component={PatientDirectory} />
  </Switch>
);

export default Routes;
