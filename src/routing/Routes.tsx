import React from 'react';

import Login from 'pages/Login';
import PatientDirectory from 'pages/PatientDirectory';
import RegisterPatient from 'pages/RegisterPatient';
import { Redirect, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import urls from './urls';

const Routes: React.FC = () => (
  <Switch>
    <PublicRoute exact path={urls.login()} component={Login} />
    <PrivateRoute exact path={urls.registerPatient()} component={RegisterPatient} />
    <PrivateRoute exact path={[urls.patients()]} component={PatientDirectory} />
    <Redirect to={urls.patients()} />
  </Switch>
);

export default Routes;
