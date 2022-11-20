/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { setAxiosToken } from 'api/axiosInstances';
import userAPI from 'api/userAPI';
import { AxiosError } from 'axios';
import { useSetNotification } from 'hooks/useSetNotification';
import { LoginFormType, LoginResponse, ChangePasswordFormType, ChangePasswordResponse } from 'models/apiTypes';
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

export const useChangePassword = () => {
  const history = useHistory();
  const setNotification = useSetNotification();
  const [, notificationDispatch] = useNotifications();

  return useMutation<ChangePasswordResponse, AxiosError, ChangePasswordFormType>(
    (params) => {
      const { request } = userAPI.single.changePassword({
        old_password: params.old_password,
        new_password1: params.new_password1,
        new_password2: params.new_password2,
      });
      return request();
    },
    {
      onSuccess: async (data) => {
        notificationDispatch(resetNotifications());
        setAxiosToken(data?.token ?? '');

        // change token in either local or session
        // based on weather remember me was checked during login or not
        (
          localStorage.getItem(__TOKEN__) ? localStorage : sessionStorage
        ).setItem(__TOKEN__, data?.token ?? '');

        setNotification('Password changed.', 'success');
        history.replace(urls.settings());
      },
      onError: (errors) => {
        setNotification('Invalid credential combination.', 'error');
        console.log(errors);
      },
    }
  );
};
