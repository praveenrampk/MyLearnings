import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '@src/components/loader';
import { ADD_NETWORKS } from '@src/helpers/constants/routes';
import {
  PrivacyContent,
  SecurityPrivacyContents,
} from '@src/interfaces-and-types/pages/settings';
import {
  fetchSettingsState,
  settingsSelectors,
  updateInSecurityPrivacy,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

const Privacy = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const settingsState = useAppSelector(settingsSelectors);

  const [timer, setTimer] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      await appDispatch(fetchSettingsState()).unwrap();
      setLoading(false);
      setTimer(String(settingsState.securityPrivacy.privacy[2].lockWallet));
    } catch (err) {
      setTimer('0');
    }
  }, [appDispatch, setLoading]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-6">
        <p className="text-lg text-black-10 dark:text-white-85 font-semibold">
          Privacy
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-base dark:text-white-55 text-black-10">
              {settingsState.securityPrivacy.privacy[0].heading1}
            </p>
            <div className="p-3 space-y-1">
              <p className="text-base dark:text-white-75 text-black-10">
                {settingsState.securityPrivacy.privacy[0].heading2}
              </p>
              <p className="text-sm dark:text-white-55 text-black-10">
                {settingsState.securityPrivacy.privacy[0].subHeading}
              </p>
              {loading ? (
                <Loader />
              ) : (
                <div
                  className="mt-4 flex flex-row gap-x-2 justify-start items-start cursor-pointer"
                  onClick={async () => {
                    setLoading(true);

                    const newPrivacy: PrivacyContent[] = [
                      ...settingsState.securityPrivacy.privacy,
                    ];

                    newPrivacy[0] = {
                      ...newPrivacy[0],
                      toggle: !settingsState.securityPrivacy.privacy[0].toggle,
                    };

                    const newSecurityPrivacy: SecurityPrivacyContents = {
                      ...settingsState.securityPrivacy,
                      privacy: [...newPrivacy],
                    };

                    await appDispatch(
                      updateInSecurityPrivacy(newSecurityPrivacy)
                    ).unwrap();
                    setLoading(false);
                  }}
                >
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settingsState.securityPrivacy.privacy[0].toggle}
                    />
                    <span className="slider round"></span>
                  </label>
                  <p className="-mt-0.5 text-base text-primary">
                    {settingsState.securityPrivacy.privacy[0].toggle
                      ? 'ON'
                      : 'OFF'}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-base dark:text-white-55 text-black-10">
              {settingsState.securityPrivacy.privacy[1].heading1}
            </p>
            <div className="p-3 space-y-1">
              <p className="text-base dark:text-white-75 text-black-10">
                {settingsState.securityPrivacy.privacy[1].heading2}
              </p>
              <p className="text-sm dark:text-white-55 text-black-11">
                {settingsState.securityPrivacy.privacy[1].subHeading}
              </p>
              <div
                className="mt-4 w-1/3 h-12 bg-primary border border-primary rounded-2xl hover:cursor-pointer"
                onClick={() => navigate(ADD_NETWORKS)}
              >
                <p className="mt-2.5 text-base text-black-10 items-center text-center">
                  {settingsState.securityPrivacy.privacy[1].buttonText}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-base dark:text-white-55 text-black-10">
              {settingsState.securityPrivacy.privacy[2].heading1}
            </p>
            <div className="p-3 space-y-1">
              <p className="text-base dark:text-white-75 text-black-10">
                {settingsState.securityPrivacy.privacy[2].heading2}
              </p>
              <p className="text-sm dark:text-white-55 text-black-11">
                {settingsState.securityPrivacy.privacy[2].subHeading}
              </p>
              {loading ? (
                <Loader />
              ) : (
                <div className="bg-transparent border dark:border-white-15 border-black-10 rounded-md h-12 w-1/2 space-y-2">
                  <input
                    className="h-12 w-full p-2 bg-transparent text-lg dark:text-white-75 text-black-10"
                    placeholder="0"
                    onChange={(e) => setTimer(e.target.value)}
                    type="number"
                    value={timer}
                  />
                  <div
                    className="flex justify-end"
                    onClick={async () => {
                      setLoading(true);

                      const newPrivacy: PrivacyContent[] = [
                        ...settingsState.securityPrivacy.privacy,
                      ];

                      newPrivacy[2] = {
                        ...newPrivacy[2],
                        lockWallet: parseInt(timer),
                      };

                      const newSecurityPrivacy: SecurityPrivacyContents = {
                        ...settingsState.securityPrivacy,
                        privacy: [...newPrivacy],
                      };

                      await appDispatch(
                        updateInSecurityPrivacy(newSecurityPrivacy)
                      ).unwrap();
                      setLoading(false);
                    }}
                  >
                    <button className="h-10 w-1/4 text-black-10 text-center bg-primary rounded-2xl">
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
