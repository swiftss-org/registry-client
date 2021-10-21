import { NotificationType } from 'components/Notifications/Notifications';

import { RESET, SET_NOTIFICATION } from './actions';

export type NotificationReducerType = (
  state: NotificationType | undefined,
  action: NotificationAction
) => NotificationType | undefined;

export type NotificationAction = {
  type: typeof SET_NOTIFICATION | typeof RESET;
  payload?: NotificationType;
};
