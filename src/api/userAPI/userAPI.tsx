/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LoginFormType, ChangePasswordFormType } from '../../models/apiTypes';
import { METHODS, request } from '../axiosInstances';

export default {
  signIn: (params: LoginFormType) => request(METHODS.POST, '/sign-in/', { params }),
  changePassword: (params: ChangePasswordFormType) => request(METHODS.PUT, '/change-password/', { params }),
};
