import { useCallback, useEffect, useState } from 'react';

import ClearTransactionHistory from '@src/components/advanced';
import Loader from '@src/components/loader';
import { updateOneFromAdvancedContents } from '@src/helpers';
import { ContentsInAdvanced } from '@src/interfaces-and-types/pages/settings';
import { homeSelectors } from '@src/pages/home/homeSlice';
import { onboardingSelectors } from '@src/pages/onboarding-flow/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import {
  backupWalletData,
  makeStateLogData,
} from '@src/services/download-data/stateLogs';

import {
  alterInAdvancedSettings,
  fetchSettingsState,
  settingsSelectors,
} from '../settingsSlice';

const AdvancedSettings = () => {
  const [loading, setLoading] = useState([]);
  const [showDeleteHistoryPopups, setShowDeleteHistoryPopups] = useState(false);
  const appDispatch = useAppDispatch();
  const onboardingState = useAppSelector(onboardingSelectors);
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);

  const fetchSettings = useCallback(async () => {
    try {
      await appDispatch(fetchSettingsState()).unwrap();

      setLoading(
        Array.from({ length: settingsState.advanced.length }, () => false)
      );
    } catch (err) {
      setLoading(
        Array.from({ length: settingsState.advanced.length }, () => false)
      );
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateInAdvancedSettings = async (
    item: ContentsInAdvanced,
    index: number
  ) => {
    const newLoading = [...loading];

    try {
      newLoading[index] = true;
      setLoading([...newLoading]);
      await appDispatch(fetchSettingsState()).unwrap();

      await appDispatch(
        alterInAdvancedSettings(
          updateOneFromAdvancedContents(settingsState.advanced, item.heading)
        )
      ).unwrap();
      newLoading[index] = false;
      setLoading([...loading]);
    } catch (err) {
      newLoading[index] = false;
      setLoading([...newLoading]);
    }
  };

  const handleClickingActivity = async (button: string) => {
    switch (button) {
      case 'Download state logs':
        makeStateLogData(onboardingState, homeState, settingsState);
        break;
      case 'Clear activity tab data':
        setShowDeleteHistoryPopups(true);
        break;
      case 'Backup':
        backupWalletData(onboardingState, homeState, settingsState);
        break;
    }
  };

  return (
    <div className="p-3 mt-5 h-full w-full">
      <div className="justify-start items-start">
        <p className="text-xl text-black-10 dark:text-white-85 font-semibold">
          Advanced
        </p>
      </div>
      <div className="py-4 overflow-hidden">
        <div className="h-2/3 overflow-auto">
          <div className="flex flex-col space-y-5">
            {settingsState.advanced.map(
              (item: ContentsInAdvanced, index: number) => (
                <div
                  key={index}
                  className="flex flex-col justify-start items-start gap-y-3"
                >
                  <p className="text-base text-black-10 dark:text-white-75">
                    {item.heading}
                  </p>
                  <p className="text-sm text-black-10 dark:text-white-65">
                    {item.subHeading}
                  </p>
                  {loading[index] ? (
                    <Loader />
                  ) : (
                    <>
                      {item.button ? (
                        <div
                          className={`w-1/3 h-12 bg-transparent border border-${item.button.btnColor} rounded-2xl hover:cursor-pointer`}
                          onClick={() => {
                            handleClickingActivity(item.button.text);
                          }}
                        >
                          <p
                            className={`mt-2.5 text-base text-${item.button.btnColor} items-center text-center`}
                          >
                            {item.button.text}
                          </p>
                        </div>
                      ) : (
                        <div
                          className="flex flex-row gap-x-2 justify-start items-start cursor-pointer"
                          onClick={() => updateInAdvancedSettings(item, index)}
                        >
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={item.toggleSwitch}
                            />
                            <span className="slider round"></span>
                          </label>
                          <p className="text-base text-primary">
                            {item.toggleSwitch ? 'ON' : 'OFF'}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {showDeleteHistoryPopups && (
        <ClearTransactionHistory showPopups={setShowDeleteHistoryPopups} />
      )}
    </div>
  );
};

export default AdvancedSettings;
