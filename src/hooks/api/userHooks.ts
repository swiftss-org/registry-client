/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { __TOKEN__ } from 'utils/constants';

import { setAxiosToken } from '../../api/axiosInstances';
import userAPI from '../../api/userAPI';
import { LoginFormType, LoginResponse } from '../../models/apiTypes';
import urls from '../../routing/urls';
import { setUserStorageItem } from '../../utils/storage';


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
