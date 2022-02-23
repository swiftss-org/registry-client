/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  RegisterPatientPayload,
  PatientsPayload,
  PaginationParams,
  RegisterEpisodePayload,
  HospitalMappingPayload,
} from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  getHospitals: (params?: PaginationParams) => request(METHODS.GET, '/hospitals/', { params }),
  getHospital: (id: string) => request(METHODS.GET, `/hospitals/${id}/`, {}),
  getPatients: (params?: PatientsPayload) => request(METHODS.GET, '/patients/', { params }),
  getSurgeons: (params?: PaginationParams) =>
    request(METHODS.GET, '/medical-personnel/', { params }),
  getPatient: (id: string) => request(METHODS.GET, `/patients/${id}/`, {}),
  getEpisode: (id: string) => request(METHODS.GET, `/episodes/${id}/`, {}),
  getEpisodeDischarge: (id: string) => request(METHODS.GET, `/episodes/${id}/discharge/`, {}),
  getEpisodeFollowUps: (id: string) => request(METHODS.GET, `/episodes/${id}/follow-ups/`, {}),
  registerPatient: (params: RegisterPatientPayload) =>
    request(METHODS.POST, '/patients/', { params }),
  registerEpisode: (params: RegisterEpisodePayload) =>
    request(METHODS.POST, '/episodes/', { params }),
  createHospitalMapping: (params: HospitalMappingPayload) =>
    request(METHODS.POST, '/patient-hospital-mappings/', { params }),
};
