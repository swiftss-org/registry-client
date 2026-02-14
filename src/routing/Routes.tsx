import React from 'react';

import LandingPage from 'pages/LandingPage';
import Layout from 'pages/Layout';
import Login from 'pages/Login';
import NationalKPIs from 'pages/NationalKPIs';
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

const LoginButMaybeAlreadySignedInRoute = () => {
  const token = getUserStorageItem(__TOKEN__);
  return token ? <Navigate to={urls.landingPage()} /> : <Layout component={Login} />;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = getUserStorageItem(__TOKEN__);
    const level = getUserStorageItem('user_level');
    if (!token) {
        return <Navigate to={urls.login()} />;
    }
    if (rest.path === '/' || !Component) {
      return <Navigate to={urls.patients()} />;
    }
    if (rest.path === '/nationalKPIs' && level !== 'NATIONAL_LEAD') {
      return <Navigate to={urls.landingPage()} />; // redirect unauthorized users
    }
    return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getUserStorageItem(__TOKEN__);
  const isStaff = getUserStorageItem('is_staff') === 'true';
  const isSuperuser = getUserStorageItem('is_superuser') === 'true';
  return token && (isStaff || isSuperuser) ? <>{children}</> : <Navigate to={urls.login()} />;
};

const router = createBrowserRouter([
  {
    path: urls.login(),
    element: <LoginButMaybeAlreadySignedInRoute />,
  },
  {
    path: urls.settings(),
    element: <PrivateRoute><Layout component={Settings} /></PrivateRoute>,
  },
  {
    path: urls.registerPatient(),
    element: <PrivateRoute><Layout component={RegisterPatient} /></PrivateRoute>,
  },
  {
    path: `${urls.patients()}/:hospitalID/:patientID${urls.episodes()}/:episodeID`,
    element: <PrivateRoute><Layout component={EpisodeDetails} /></PrivateRoute>,
  },
  {
    path: `${urls.patients()}/:hospitalID/:patientID/add-episode`,
    element: <PrivateRoute><Layout component={RegisterEpisode} /></PrivateRoute>,
  },
  {
    path: `${urls.patients()}/:hospitalID/:patientID`,
    element: <PrivateRoute><Layout component={PatientDetails} /></PrivateRoute>,
  },
  {
    path: urls.patients(),
    element: <PrivateRoute><Layout component={PatientDirectory} /></PrivateRoute>,
  },
  {
    path: urls.nationalKPIs(),
    element: <PrivateRoute><NationalKPIs /></PrivateRoute>,
  },
  {
    path: urls.landingPage(),
    element: <PrivateRoute><Layout component={LandingPage} /></PrivateRoute>,
  },
  {
    path: '*',
    element: <Navigate to={urls.login()} />,
  },
]);

const Routes: React.FC = () => <RouterProvider router={router} />;

export default Routes;