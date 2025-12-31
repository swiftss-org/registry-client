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
  patientDetails: (hospitalID: string, patientID: string, tab='general') => `/patients/${hospitalID}/${patientID}?tab=${tab}`,
  addEpisode: (hospitalID: string, patientID: string) => `/patients/${hospitalID}/${patientID}/add-episode`,
  episodeDetails: (hospitalID: string, patientID: string, episodeID: string) => `/patients/${hospitalID}/${patientID}/episodes/${episodeID}`,
};

export default urls;
