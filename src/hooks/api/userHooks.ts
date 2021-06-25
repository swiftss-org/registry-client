/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import { LoginFormType, LoginResponse } from '../../models/apiTypes';
import userAPI from '../../api/userAPI';
import { setAxiosToken } from '../../api/axiosInstances';
import { __TOKEN__ } from 'utils/constants';
import { setUserStorageItem } from '../../utils/storage';

import urls from '../../routing/urls';

export const useSignIn = () => {
  const history = useHistory();

  return useMutation<LoginResponse, AxiosError, LoginFormType>(
    (params) => {
      const { request } = userAPI.single.signIn({
        username: params.email,
        password: params.password,
      });
      return request();
    },
    {
      onSuccess: async (data, variables) => {
        setUserStorageItem(__TOKEN__, data?.token ?? '', !variables.rememberMe);
        setAxiosToken(data?.token ?? '');

        history.replace(urls.patients());
      },
      onError: (errors) => {
        console.log(errors);
      },
    }
  );
};
