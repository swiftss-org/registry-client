import React from 'react';

import LandingPage from 'pages/LandingPage';
import Login from 'pages/Login';
import PatientDirectory from 'pages/PatientDirectory';
import RegisterPatient from 'pages/RegisterPatient';
import Settings from 'pages/Settings';
import { Redirect, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import urls from './urls';
import EpisodeDetails from '../pages/EpisodeDetails';
import PatientDetails from '../pages/PatientDetails';
import RegisterEpisode from '../pages/RegisterEpisode';

const Routes: React.FC = () => (
  <Switch>
    <PublicRoute exact path={urls.login()} component={Login} />
    <PrivateRoute exact path={urls.settings()} component={Settings} />
    <PrivateRoute exact path={urls.registerPatient()} component={RegisterPatient} />
    <PrivateRoute
      exact
      path={`${urls.patients()}/:hospitalID/:patientID${urls.episodes()}/:episodeID`}
      component={EpisodeDetails}
    />
    <PrivateRoute
      exact
      path={`${urls.patients()}/:hospitalID/:patientID/add-episode`}
      component={RegisterEpisode}
    />
    <PrivateRoute
      exact
      path={`${urls.patients()}/:hospitalID/:patientID`}
      component={PatientDetails}
    />
    <PrivateRoute exact path={[urls.patients()]} component={PatientDirectory} />\
    <PrivateRoute exact path={urls.landingPage()} component={LandingPage} />
    <Redirect to={urls.login()} />
  </Switch>
);

export default Routes;
