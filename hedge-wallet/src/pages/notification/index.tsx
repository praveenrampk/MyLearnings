import { createRoot } from 'react-dom/client';

import NotificationContainer from './Container';
import '@styles/global.scss';

createRoot(document.getElementById('notification-container')).render(
  <NotificationContainer />
);
