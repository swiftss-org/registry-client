/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { METHODS, request } from '../axiosInstances';
import { LoginResponse } from '../../models/apiTypes';

export default {
  signIn: (params: LoginResponse) => request(METHODS.POST, '/sign-in/', { params }),
};
