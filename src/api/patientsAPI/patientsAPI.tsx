/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RegisterPatientPayload, PatientsPayload, PaginationParams } from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  getHospitals: (params?: PaginationParams) => request(METHODS.GET, '/hospitals/', { params }),
  getHospital: (id: string) => request(METHODS.GET, `/hospitals/${id}`, {}),
  getPatients: (params?: PatientsPayload) => request(METHODS.GET, '/patients/', { params }),
  getPatient: (id: string) => request(METHODS.GET, `/patients/${id}`, {}),
  registerPatient: (params: RegisterPatientPayload) =>
    request(METHODS.POST, '/patients/', { params }),
};
