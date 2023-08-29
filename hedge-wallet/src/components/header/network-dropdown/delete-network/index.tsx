import React, { FC, useCallback, useEffect, useRef } from 'react';

import { removeOneChain } from '@src/helpers';
import { DeleteNetworkProps } from '@src/interfaces-and-types/components';
import {
  fetchSettingsState,
  deleteMainNetOrTestNet,
  settingsSelectors,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

const DeleteNetwork: FC<DeleteNetworkProps> = ({
  toggleNetwork,
  showNetwork,
  networkData,
  status,
}) => {
  const settingsState = useAppSelector(settingsSelectors);
  const appDispatch = useAppDispatch();

  const deleteRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      toggleNetwork(false);
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
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col p-10 justify-center items-center gap-y-4">
            <p className="text-2xl text-black-10 dark:text-white-75 font-semibold">
              Delete network?
            </p>
            <div className="flex flex-col gap-x-1">
              <p className="text-base text-black-10 dark:text-white-65 text-center">
                Are you sure you want to delete this network
              </p>
              <p className="text-base text-black-10 dark:text-white-75 text-center font-semibold">
                {`(${networkData.network.prettyName})?`}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="border-b border-black-10 dark:border-white-10 w-full"></div>
            <div className="flex flex-row p-2 justify-evenly">
              <div
                className="px-10 py-4 text-sm text-primary bg-transparent border border-primary rounded-3xl cursor-pointer"
                onClick={() => (showNetwork(false), toggleNetwork(true))}
              >
                Cancel
              </div>
              <div
                className="px-10 py-4 text-sm bg-red border border-red rounded-3xl cursor-pointer"
                onClick={async () => {
                  await appDispatch(
                    deleteMainNetOrTestNet({
                      networks: removeOneChain(
                        settingsState.networks[status],
                        networkData.network
                      ),
                      status,
                    })
                  );
                  toggleNetwork(false);
                  showNetwork(false);
                }}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteNetwork;
