import { useCallback, useEffect, useState } from 'react';

import Loader from '@src/components/loader';
import Privacy from '@src/components/securityPrivacy/privacy';
import Security from '@src/components/securityPrivacy/security';
import { useAppDispatch } from '@src/redux/store';

import { fetchSettingsState } from '../settingsSlice';

const SecurityAndPolicy = () => {
  const appDispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      await appDispatch(fetchSettingsState()).unwrap();
      setLoading(false);
    } catch (err) {
      null;
    }
  }, [appDispatch, setLoading]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return loading ? (
    <Loader />
  ) : (
    <div className="p-3 mt-5 h-full w-full bg-transparent space-y-4">
      <div className="justify-start items-start">
        <p className="text-xl text-black-10 dark:text-white-85 font-semibold">
          Security & Privacy
        </p>
      </div>
      <div className="flex flex-col space-y-8">
        <Security />
        <Privacy />
      </div>
    </div>
  );
};

export default SecurityAndPolicy;
