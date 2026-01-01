import React from 'react';

import { Alert } from '@mui/material';
import { resetNotifications } from 'providers/Notifications/actions';
import { useNotifications } from 'providers/Notifications/NotificationProvider';

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

  if (!notification) {
    return null;
  }

  return (
    <Alert
      ref={ref}
      severity={notification.type}
      onClose={removeNotification}
      sx={{
        borderRadius: '8px',
        scrollMargin: '40px',
        mb: 2,
      }}
    >
      {notification.message}
    </Alert>
  );
};

export default Notifications;