import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOCK_ROUTE } from '@src/helpers/constants/routes';
import { lockWallet } from '@src/pages/home/homeSlice';
import {
  fetchSettingsState,
  settingsSelectors,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

const AutoLockTimer = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const settingsState = useAppSelector(settingsSelectors);
  const timerRef = useRef(null);

  const fetchSettings = useCallback(async () => {
    try {
      await appDispatch(fetchSettingsState()).unwrap();
    } catch (err) {
      null;
    }
  }, [appDispatch]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleLogoutTimer = async () => {
    await appDispatch(fetchSettingsState()).unwrap();
    const time = settingsState.securityPrivacy.privacy[2]?.lockWallet;

    if (time) {
      resetTimer();

      timerRef.current = setTimeout(() => {
        logoutAction();
      }, Number(time) * 60 * 1000);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const logoutAction = async () => {
    try {
      await appDispatch(lockWallet()).unwrap();
      navigate(LOCK_ROUTE);
    } catch (err) {
      null;
    }
  };

  useEffect(() => {
    const handleUserActivity = () => {
      resetTimer();
      handleLogoutTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  useEffect(() => {
    handleLogoutTimer();

    return resetTimer;
  }, []);

  return null;
};

export default AutoLockTimer;
