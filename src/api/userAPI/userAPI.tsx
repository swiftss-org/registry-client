/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { METHODS, request } from '../axiosInstances';
import { SignInParams } from '../../models/apiTypes';

export default {
  signIn: (params: SignInParams) => request(METHODS.POST, '/sign-in/', { params }),
};
