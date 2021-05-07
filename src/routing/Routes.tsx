import React from 'react';
import { Switch } from 'react-router-dom';
import urls from './urls';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { pageOptions } from '../config';
import { Dashboard } from '../components/Dashboard';
import { getLazyComponent } from '../config/utils';

const Routes: React.FC = () => (
  <Dashboard pageOptions={pageOptions}>
    <Switch>
      <PublicRoute
        exact
        path={`${urls.defaultPublic()}`}
        component={() => <div> Landing Page </div>}
      />
      <PublicRoute path={'/demo-page'} component={getLazyComponent(pageOptions[1])} />

      <PrivateRoute disabled path={'/'} />
    </Switch>
  </Dashboard>
);

export default Routes;
