import { FC, useCallback, useEffect, useRef } from 'react';

import { ClearTransactionHistoryProps } from '@src/interfaces-and-types/advanced';
import { homeSelectors, updateActiveAccount } from '@src/pages/home/homeSlice';
import {
  fetchSettingsState,
  settingsSelectors,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { clearActivity } from '@src/services/download-data/stateLogs';

const ClearTransactionHistory: FC<ClearTransactionHistoryProps> = ({
  showPopups,
}) => {
  const settingsState = useAppSelector(settingsSelectors);
  const homeState = useAppSelector(homeSelectors);
  const appDispatch = useAppDispatch();

  const deleteRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      showPopups(false);
    }
  };

  const getSettingsState = useCallback(async () => {
    try {
      await appDispatch(fetchSettingsState()).unwrap();
    } catch (err) {
      null;
    }
  }, [appDispatch]);

  useEffect(() => {
    getSettingsState();
    document.addEventListener('mousedown', (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    };
  }, [getSettingsState]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
      <div className="fixed inset-0 bg-white-75 dark:bg-black opacity-50"></div>
      <div ref={deleteRef} className="deleteNetworkModal">
        <div className="flex flex-col">
          <div className="flex flex-col p-10 justify-center items-center gap-y-3">
            <p className="text-2xl text-black-10 dark:text-white-75 font-semibold">
              Clear activity?
            </p>
            <div className="flex flex-col gap-x-1">
              <p className="text-base text-black-10 dark:text-white-65 text-center">
                {`This clears the information in your wallet's activity page and The only affected account and
                network are the present ones. Nothing will alter your funds or
                incoming transactions.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row p-2 justify-evenly">
              <div
                className="w-40 py-4 text-sm text-primary text-center bg-transparent border border-primary rounded-3xl cursor-pointer"
                onClick={() => showPopups(false)}
              >
                Nevermind
              </div>
              <div
                className="w-40 py-4 text-sm bg-red border text-center border-red rounded-3xl cursor-pointer"
                onClick={async () => {
                  await appDispatch(
                    updateActiveAccount({
                      account: clearActivity(homeState.activeAccount),
                      networkName: settingsState.networks.activeNet.name,
                    })
                  ).unwrap();
                  showPopups(false);
                }}
              >
                Clear
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearTransactionHistory;
