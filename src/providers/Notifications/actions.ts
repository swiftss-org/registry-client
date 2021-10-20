import { NotificationType } from 'components/Notifications/Notifications';

import { NotificationAction } from './types';

export const SET_NOTIFICATION = 'set_notification' as const;
export const RESET = 'reset' as const;

export const addNotification = (notification: NotificationType): NotificationAction => {
  return {
    type: SET_NOTIFICATION,
    payload: notification,
  };
};
export const resetNotifications = (): NotificationAction => ({ type: RESET });
