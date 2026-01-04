/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const urls = {
  login: () => '/login',
  settings: () => '/settings',
  patients: () => '/patients',
  registerPatient: () => '/patients/register',
  episodes: () => '/episodes',
  episodeStats: () => '/episodes/stats',
  landingPage: () => '/landing',
  nationalKPIs: () => '/nationalKPIs',
  patientDetails: (hospitalID: string | number, patientID: string | number, tab = 'general') => `/patients/${hospitalID}/${patientID}?tab=${tab}`,
  addEpisode: (hospitalID: string | number, patientID: string | number) => `/patients/${hospitalID}/${patientID}/add-episode`,
  episodeDetails: (hospitalID: string | number, patientID: string | number, episodeID: string | number) => `/patients/${hospitalID}/${patientID}/episodes/${episodeID}`,
};

export default urls;
