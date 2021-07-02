/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RegisterPatientPayload } from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  getHospitals: () => request(METHODS.GET, '/hospitals/', {}),
  registerPatient: (params: RegisterPatientPayload) =>
    request(METHODS.POST, '/patients/', { params }),
};
