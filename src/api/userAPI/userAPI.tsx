/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LoginFormType } from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  signIn: (params: LoginFormType) => request(METHODS.POST, '/sign-in/', { params }),
};
