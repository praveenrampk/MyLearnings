import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Loader from '@src/components/loader';
import { addContactAtIndex } from '@src/helpers';
import { DeleteContactProps } from '@src/interfaces-and-types/contacts';
import { ContactDetails } from '@src/interfaces-and-types/home-state';
import {
  fetchAccountsState,
  homeSelectors,
  updateAccountDetails,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import { settingsSelectors } from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

const DeleteCreatedContact: FC<DeleteContactProps> = ({
  details,
  showPopups,
}) => {
  const appDispatch = useAppDispatch();
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const [loading, setLoading] = useState(true);

  const deleteRef = useRef(null);

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
      setLoading(false);
    }
  }, [appDispatch]);

  useEffect(() => {
    getSettingsState();
    document.addEventListener('mousedown', (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    };
  }, [getSettingsState]);

  const deleteContact = async () => {
    const contacts: Record<string, ContactDetails> = {
      ...homeState.activeAccount.contacts,
    };

    delete contacts[details.address];

    const { accounts, account } = addContactAtIndex(
      [...homeState.accounts],
      { ...homeState.activeAccount },
      { ...contacts }
    );

    await appDispatch(
      updateAccountDetails({
        accounts,
        networkName: settingsState.networks.activeNet.name,
      })
    ).unwrap();

    await appDispatch(
      updateActiveAccount({
        account,
        networkName: settingsState.networks.activeNet.name,
      })
    );
    showPopups(false);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
      <div className="fixed inset-0 bg-white-75 dark:bg-black opacity-50"></div>
      <div ref={deleteRef} className="deleteNetworkModal">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-y-10">
            <div className="flex flex-col p-10 justify-center items-center gap-y-4">
              <p className="text-2xl text-black-10 dark:text-white-75 font-semibold">
                Delete Contact?
              </p>
              <div className="flex flex-col gap-x-1">
                <p className="text-base text-black-10 dark:text-white-65 text-center">
                  Are you sure you want to delete this contact
                </p>
                <p className="text-base text-black-10 dark:text-white-75 text-center font-semibold">
                  {`(${details.username})?`}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="border-b border-black-10 dark:border-white-10 w-full"></div>
              <div className="flex flex-row p-2 justify-evenly">
                <div
                  className="px-10 py-4 text-sm text-primary bg-transparent border border-primary rounded-3xl cursor-pointer"
                  onClick={() => showPopups(false)}
                >
                  Cancel
                </div>
                <div
                  className="px-10 py-4 text-sm bg-red border border-red rounded-3xl cursor-pointer"
                  onClick={async () => deleteContact()}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteCreatedContact;
