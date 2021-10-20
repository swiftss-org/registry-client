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
import { __TOKEN__ } from 'utils/constants';
import { setUserStorageItem } from 'utils/storage';

export const useSignIn = () => {
  const history = useHistory();
  const setNotification = useSetNotification();
  const [, notificationDispatch] = useNotifications();

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
        notificationDispatch(resetNotifications());
        setUserStorageItem(__TOKEN__, data?.token ?? '', !variables.rememberMe);
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
