import React from 'react';

import LandingPage from 'pages/LandingPage';
import Login from 'pages/Login';
import PatientDirectory from 'pages/PatientDirectory';
import RegisterPatient from 'pages/RegisterPatient';
import Settings from 'pages/Settings';
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';

import urls from './urls';
import EpisodeDetails from '../pages/EpisodeDetails';
import PatientDetails from '../pages/PatientDetails';
import RegisterEpisode from '../pages/RegisterEpisode';
import { __TOKEN__ } from '../utils/constants';
import { getUserStorageItem } from '../utils/storage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getUserStorageItem(__TOKEN__);
  return token ? <>{children}</> : <Navigate to={urls.login()} />;
};

const router = createBrowserRouter([
  {
    path: urls.login(),
    element: <Login />,
  },
  {
    path: urls.settings(),
    element: <PrivateRoute><Settings /></PrivateRoute>,
  },
  {
    path: urls.registerPatient(),
    element: <PrivateRoute><RegisterPatient /></PrivateRoute>,
  },
  {
    path: `${urls.patients()}/:hospitalID/:patientID${urls.episodes()}/:episodeID`,
    element: <PrivateRoute><EpisodeDetails /></PrivateRoute>,
  },
  {
    path: `${urls.patients()}/:hospitalID/:patientID/add-episode`,
    element: <PrivateRoute><RegisterEpisode /></PrivateRoute>,
  },
  {
    path: `${urls.patients()}/:hospitalID/:patientID`,
    element: <PrivateRoute><PatientDetails /></PrivateRoute>,
  },
  {
    path: urls.patients(),
    element: <PrivateRoute><PatientDirectory /></PrivateRoute>,
  },
  {
    path: urls.landingPage(),
    element: <PrivateRoute><LandingPage /></PrivateRoute>,
  },
  {
    path: '*',
    element: <Navigate to={urls.login()} />,
  },
]);

const Routes: React.FC = () => <RouterProvider router={router} />;

export default Routes;