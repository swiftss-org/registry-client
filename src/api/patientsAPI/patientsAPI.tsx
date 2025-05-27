/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  RegisterPatientPayload,
  PatientsPayload,
  PaginationParams,
  RegisterEpisodePayload,
  HospitalMappingPayload,
  DischargePayload,
  FollowUpPayload,
} from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  getHospitals: (params?: PaginationParams) => request(METHODS.GET, '/hospitals/', { params }),
  getHospital: (id: string) => request(METHODS.GET, `/hospitals/${id}/`, {}),
  getPatients: (params?: PatientsPayload) => request(METHODS.GET, '/patients/', { params }),
  getSurgeons: (params?: PaginationParams) =>
    request(METHODS.GET, '/medical-personnel/', { params }),
  getPatient: (id: string) => request(METHODS.GET, `/patients/${id}/`, {}),
  getUnlinkedPatients: () => request(METHODS.GET, '/unlinked-patients/', {}),
  getEpisode: (id: string) => request(METHODS.GET, `/episodes/${id}/`, {}),
  getEpisodeDischarge: (id: string) => request(METHODS.GET, `/episodes/${id}/discharge/`, {}),
  getEpisodeFollowUps: (id: string) => request(METHODS.GET, `/episodes/${id}/follow-ups/`, {}),
  registerPatient: (params: RegisterPatientPayload) =>
    request(METHODS.POST, '/patients/', { params }),
  registerEpisode: (params: RegisterEpisodePayload) =>
    request(METHODS.POST, '/episodes/', { params }),
  createHospitalMapping: (params: HospitalMappingPayload) =>
    request(METHODS.POST, '/patient-hospital-mappings/', { params }),
  dischargePatient: (params: DischargePayload) => request(METHODS.POST, `/discharges/`, { params }),
  followUpPatient: (params: FollowUpPayload) => request(METHODS.POST, `/follow-ups/`, { params }),
  getPreferredHospital: () => request(METHODS.GET, '/preferred-hospital/retrieve_for_current_user/', {}),
  getSurgeonEpisodeSummary: () => request(METHODS.GET, '/surgeon-episode-summary/', {}),
  getOwnedEpisodes: () => request(METHODS.GET, '/owned-episodes/', {}),
  getAnnouncements: () => request(METHODS.GET, '/announcements/', {}),
};
