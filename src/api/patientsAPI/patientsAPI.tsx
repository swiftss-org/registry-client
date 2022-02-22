/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  RegisterPatientPayload,
  PatientsPayload,
  PaginationParams,
  RegisterEpisodePayload,
} from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  getHospitals: (params?: PaginationParams) => request(METHODS.GET, '/hospitals/', { params }),
  getHospital: (id: string) => request(METHODS.GET, `/hospitals/${id}/`, {}),
  getPatients: (params?: PatientsPayload) => request(METHODS.GET, '/patients/', { params }),
  getSurgeons: (params?: PaginationParams) =>
    request(METHODS.GET, '/medical-personnel/', { params }),
  getPatient: (id: string) => request(METHODS.GET, `/patients/${id}/`, {}),
  registerPatient: (params: RegisterPatientPayload) =>
    request(METHODS.POST, '/patients/', { params }),
  registerEpisode: (params: RegisterEpisodePayload) =>
    request(METHODS.POST, '/episodes/', { params }),
};
