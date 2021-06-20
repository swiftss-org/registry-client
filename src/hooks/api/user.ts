/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query';

import { SignInParams } from '../../models/apiTypes';
import userAPI from '../../api/userAPI';
import { setAxiosToken } from '../../api/axiosInstances';
import { __TOKEN__ } from 'utils/constants';
import { setUserStorageItem } from '../../utils/storage';

export const useSignIn = () => {
  return useMutation(
    ({ username, password }: SignInParams) => {
      const { request } = userAPI.single.signIn({ username, password });
      return request();
    },
    {
      onSuccess: async (data) => {
        setUserStorageItem(__TOKEN__, data.token);
        setAxiosToken(data.token);
      },
      onError: (errors) => {
        console.log(errors);
      },
    }
  );
};
