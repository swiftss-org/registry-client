import React from 'react';

import Login from 'pages/Login';
import PatientDirectory from 'pages/PatientDirectory';
import RegisterPatient from 'pages/RegisterPatient';
import { Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import urls from './urls';

const Routes: React.FC = () => (
  <Switch>
    <PublicRoute exact path={urls.login()} component={Login} />
    <PublicRoute exact path={urls.register()} component={RegisterPatient} />
    <PublicRoute exact path={[urls.patients(), '/']} component={PatientDirectory} />
  </Switch>
);

export default Routes;