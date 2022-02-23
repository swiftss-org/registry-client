import { NotificationTypes } from '@orfium/ictinus/dist/components/Notification/Notification';

import { NotificationType } from '../components/Notifications/Notifications';
import { addNotification } from '../providers/Notifications/actions';
import { useNotifications } from '../providers/Notifications/NotificationProvider';

export const useSetNotification = () => {
  const [, dispatch] = useNotifications();

  return (message: string, type: NotificationTypes, isGlobal = false, isPreview = false) => {
    const newNotification: NotificationType = {
      isGlobal,
      isPreview,
      message: message,
      type: type,
      id: 0,
    };

    dispatch(addNotification(newNotification));
  };
};
