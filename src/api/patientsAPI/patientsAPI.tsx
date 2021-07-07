/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RegisterPatientPayload, PatientsPayload, PaginationParams } from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  getHospitals: (params?: PaginationParams) => request(METHODS.GET, '/hospitals/', { params }),
  getPatients: (params?: PatientsPayload) => request(METHODS.GET, '/patients/', { params }),
  registerPatient: (params: RegisterPatientPayload) =>
    request(METHODS.POST, '/patients/', { params }),
};
