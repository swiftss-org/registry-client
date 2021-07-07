/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PaginationParams, RegisterPatientPayload } from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  getHospitals: (params?: PaginationParams) => request(METHODS.GET, '/hospitals/', { params }),
  registerPatient: (params: RegisterPatientPayload) =>
    request(METHODS.POST, '/patients/', { params }),
};
