/** @jsxImportSource @emotion/react */
import React from 'react';

import { Alert } from '@mui/material';

import { NotificationWrapper } from './Notifications.styles';
import { resetNotifications } from '../../providers/Notifications/actions';
import { useNotifications } from '../../providers/Notifications/NotificationProvider';

export type NotificationType = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isGlobal: boolean;
  isPreview?: boolean;
  id: number;
};

const Notifications: React.FC = () => {
  const [notification, dispatch] = useNotifications();
  const ref = React.useRef<HTMLDivElement>(null);

  const removeNotification = () => {
    dispatch(resetNotifications());
  };

  React.useEffect(() => {
    if (notification && ref.current) {
      ref.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }, [notification]);

  return (
    <>
      {notification && (
        <NotificationWrapper ref={ref}>
          <Alert severity={notification.type} onClose={removeNotification}>
            {notification.message}
          </Alert>
        </NotificationWrapper>
      )}
    </>
  );
};

export default Notifications;