import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { store } from '@src/redux/store';

import App from '../routes';

import '@styles/global.scss';

createRoot(document.getElementById('app-container')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <Outlet />
    </StrictMode>
  </Provider>
);
