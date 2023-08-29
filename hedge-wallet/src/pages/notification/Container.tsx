import { useEffect, useState } from 'react';

import Loader from '@src/components/loader';

import Approve from './approve';

const NotificationContainer = () => {
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    chrome.storage.local.get('notificationManager', function (data) {
      setNotificationData(data.notificationManager);
    });
  }, []);

  const renderNotification = () => {
    switch (notificationData.type) {
      case 'enable-hedge':
        return <Approve domain={notificationData.domain} />;
      default:
        return;
    }
  };

  return notificationData ? (
    <div className="container">{renderNotification()}</div>
  ) : (
    <div className="loading">
      <Loader />
    </div>
  );
};

export default NotificationContainer;
