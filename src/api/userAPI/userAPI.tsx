/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LoginResponse } from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  signIn: (params: LoginResponse) => request(METHODS.POST, '/sign-in/', { params }),
};
