import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Loader from '@src/components/loader';
import { CloseSiteProps } from '@src/interfaces-and-types/advanced';
import {
  fetchAccountsState,
  homeSelectors,
  updateAccountDetails,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import { settingsSelectors } from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

const ConnectedSites: FC<CloseSiteProps> = ({ showPopups }) => {
  const settingsState = useAppSelector(settingsSelectors);
  const homeState = useAppSelector(homeSelectors);
  const appDispatch = useAppDispatch();

  const deleteRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      showPopups(false);
    }
  };

  const getSettingsState = useCallback(async () => {
    try {
      await appDispatch(fetchAccountsState()).unwrap();
      setLoading(false);
    } catch (err) {
      setLoading(true);
      null;
    }
  }, [appDispatch, fetchAccountsState, setLoading]);

  useEffect(() => {
    getSettingsState();
    document.addEventListener('mousedown', (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    };
  }, [getSettingsState]);

  return loading ? (
    <Loader />
  ) : (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
      <div className="fixed inset-0 bg-white-75 dark:bg-black opacity-50"></div>
      <div ref={deleteRef} className="modal">
        <div className="flex flex-col">
          <div className="flex flex-col p-10 gap-y-3">
            <p className="text-2xl text-black-10 dark:text-white-75 font-semibold">
              Connected Sites
            </p>
            <div className="flex flex-col gap-x-1">
              <p className="text-base text-black-10 dark:text-white-65">
                {homeState.activeAccount.name} is connected to these sites. They
                can view your account address.
              </p>
            </div>
            {homeState.activeAccount.connectedSites.map(
              (site: string, index: number) => (
                <div
                  className="flex flex-row justify-between h-8 w-full border-b border-b-white-10"
                  key={index}
                >
                  <p className="text-white-75 text-lg">{site}</p>
                  <p
                    className="text-sm text-primary cursor-pointer"
                    onClick={async () => {
                      const updatedActiveAccount = {
                        ...homeState.activeAccount,
                        connectedSites:
                          homeState.activeAccount.connectedSites.filter(
                            (_site) => _site !== site
                          ),
                      };

                      const accounts = homeState.accounts.map((account) => {
                        if (
                          account.publicKey === updatedActiveAccount.publicKey
                        ) {
                          return updatedActiveAccount;
                        }

                        return account;
                      });

                      await appDispatch(
                        updateActiveAccount({
                          account: updatedActiveAccount,
                          networkName: settingsState.networks.activeNet.name,
                        })
                      );

                      await appDispatch(
                        updateAccountDetails({
                          accounts,
                          networkName: settingsState.networks.activeNet.name,
                        })
                      );
                    }}
                  >
                    Disconnect
                  </p>
                </div>
              )
            )}
          </div>
          {/* <div className="flex flex-col">
            <div className="flex flex-row p-2 justify-evenly">
              <div
                className="w-40 py-4 text-sm text-primary text-center bg-transparent border border-primary rounded-3xl cursor-pointer"
                onClick={() => showPopups(false)}
              >
                Nevermore
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ConnectedSites;
