import React, { Dispatch, FC, useContext, useReducer } from 'react';

import { NotificationType } from 'components/Notifications/Notifications';

import { RESET, SET_NOTIFICATION } from './actions';
import { NotificationAction, NotificationReducerType } from './types';

const NotificationsContext = React.createContext<
  [NotificationType | undefined, Dispatch<NotificationAction>]
>([undefined, () => null]);

const notificationReducer = (state: NotificationType | undefined, action: NotificationAction) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { ...(action.payload as NotificationType) };
    case RESET:
      return undefined;
    default:
      return state;
  }
};

export const useNotifications = (): [
  NotificationType | undefined,
  React.Dispatch<NotificationAction>
] => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationsProvider: FC = ({ children }) => {
  const [notifications, dispatch] = useReducer<NotificationReducerType>(
    notificationReducer,
    undefined
  );

  return (
    <NotificationsContext.Provider value={[notifications, dispatch]}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
