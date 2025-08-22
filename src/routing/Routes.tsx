import React from 'react';

import LandingPage from 'pages/LandingPage';
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

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getUserStorageItem(__TOKEN__);
  return token ? <>{children}</> : <Navigate to={urls.login()} />;
};

// import React from 'react';
//
// import Layout from 'pages/Layout/Layout';
// import { Redirect, Route } from 'react-router-dom';
//
// import { CustomRouteProps } from './types';
// import urls from './urls';
// import { __TOKEN__ } from '../utils/constants';
// import { getUserStorageItem } from '../utils/storage';
//
// const PrivateRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest }) => {
//   const token = getUserStorageItem(__TOKEN__);
//   const level = getUserStorageItem('user_level');
//
//   if (!token) {
//     return <Route {...rest} render={() => <Redirect to={urls.login()} />} />;
//   }
//   if (rest.path === '/' || !Component) {
//     return <Redirect to={urls.patients()} />;
//   }
//
//   if (rest.path === '/nationalKPIs' && level !== 'NATIONAL_LEAD') {
//     return <Redirect to={urls.landingPage()} />; // redirect unauthorized users
//   }
//
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return <Route {...rest} render={(props: any) => <Layout component={Component} {...props} />} />;
// };
//
// export default PrivateRoute;

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
    path: urls.nationalKPIs(),
    element: <PrivateRoute><NationalKPIs /></PrivateRoute>,
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