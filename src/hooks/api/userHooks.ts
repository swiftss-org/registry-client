/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { setAxiosToken } from 'api/axiosInstances';
import userAPI from 'api/userAPI';
import { AxiosError } from 'axios';
import { useSetNotification } from 'hooks/useSetNotification';
import { LoginFormType, LoginResponse } from 'models/apiTypes';
import { resetNotifications } from 'providers/Notifications/actions';
import { useNotifications } from 'providers/Notifications/NotificationProvider';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import urls from 'routing/urls';
import { __EMAIL__, __TOKEN__ } from 'utils/constants';
import { setUserStorageItem } from 'utils/storage';

export const useSignIn = () => {
  const history = useHistory();
  const setNotification = useSetNotification();
  const [, notificationDispatch] = useNotifications();

  return useMutation<LoginResponse, AxiosError, LoginFormType>(
    (params) => {
      console.log(params);
      const { request } = userAPI.single.signIn({
        username: params.username,
        password: params.password,
        rememberMe: params.rememberMe,
      });
      return request();
    },
    {
      onSuccess: async (data, variables) => {
        notificationDispatch(resetNotifications());
        setUserStorageItem(__TOKEN__, data?.token ?? '', !variables.rememberMe);
        setUserStorageItem(__EMAIL__, data?.user.email ?? '');
        setAxiosToken(data?.token ?? '');

        history.replace(urls.patients());
      },
      onError: (errors) => {
        setNotification('Invalid credential combination.', 'error');
        console.log(errors);
      },
    }
  );
};
