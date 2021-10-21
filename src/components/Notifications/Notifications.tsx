/** @jsxImportSource @emotion/react */
import React from 'react';

import { InlineNotification } from '@orfium/ictinus';
import { NotificationTypes } from '@orfium/ictinus/dist/components/Notification/Notification';

import { resetNotifications } from '../../providers/Notifications/actions';
import { useNotifications } from '../../providers/Notifications/NotificationProvider';
import { NotificationWrapper } from './Notifications.styles';

export interface NotificationType {
  message: string;
  type: NotificationTypes;
  isGlobal: boolean;
  isPreview?: boolean;
  id: number;
}

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
          <InlineNotification
            styleType={'outlined'}
            withIcon
            message={notification.message}
            type={notification.type}
            primaryCTALabel="Action"
            closeCTA={() => removeNotification()}
          />
        </NotificationWrapper>
      )}
    </>
  );
};

export default Notifications;
