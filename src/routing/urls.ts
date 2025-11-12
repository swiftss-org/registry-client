/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const urls = {
  login: () => '/login',
  settings: () => '/settings',
  patients: () => '/patients',
  registerPatient: () => '/patients/register',
  episodes: () => '/episodes',
  episodeStats: () => '/episodes/stats',
  landingPage: () => '/landing',
  globalKPIs: () => '/globalKPIs',
};

export default urls;
