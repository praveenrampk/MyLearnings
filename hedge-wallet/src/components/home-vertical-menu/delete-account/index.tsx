import { FC, useState, useRef, useEffect, useCallback } from 'react';

import { Wrong } from '@src/assets/img';
import Loader from '@src/components/loader';
import { AccountDetailsModalClose } from '@src/interfaces-and-types/components';
import {
  fetchAccountsState,
  homeSelectors,
  updateAccountDetails,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import {
  fetchSettingsState,
  settingsSelectors,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { getShape } from '@src/services/utils';

const DeleteAccount: FC<AccountDetailsModalClose> = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [shape, setShape] = useState('');
  const modalRef = useRef(null);

  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const appDispatch = useAppDispatch();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
      closeModal(false);
    }
  };

  const removeAccount = async () => {
    setLoading(true);
    await appDispatch(fetchSettingsState()).unwrap();

    const index = homeState.accounts.findIndex(
      (account) => account.publicKey === homeState.activeAccount.publicKey
    );
    const accounts = [...homeState.accounts];
    accounts.splice(index, 1).pop();

    await appDispatch(
      updateActiveAccount({
        account: accounts[index - 1],
        networkName: settingsState.networks.activeNet.name,
      })
    ).unwrap();

    await appDispatch(
      updateAccountDetails({
        accounts,
        networkName: settingsState.networks.activeNet.name,
      })
    ).unwrap();

    closeModal(false);
    setLoading(false);
  };

  const getHomeStateValues = useCallback(async () => {
    try {
      await appDispatch(fetchAccountsState()).unwrap();
      await appDispatch(fetchSettingsState()).unwrap();
    } catch (err) {
      null;
    }
  }, []);

  useEffect(() => {
    getHomeStateValues();
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [getHomeStateValues]);

  useEffect(() => {
    if (homeState.activeAccount) {
      setShape(getShape(homeState.activeAccount.publicKey));
    }
  }, [homeState]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="modal">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-y-6">
                <div className="flex md:px-10 px-8">
                  <p className="text-white-75 md:text-2xl text-lg font-bold space-x-2">
                    Remove account ?
                  </p>
                </div>
              </div>
              <img
                className="h-6 w-6 mt-0 cursor-pointer"
                src={Wrong}
                onClick={() => {
                  setIsOpen(false);
                  closeModal(false);
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-center flex-1 md:space-y-4 space-y-3">
              <img className="h-12 w-12 bg-white rounded-full" src={shape} />
              <p className="text-white-75 text-2xl">
                {homeState.activeAccount.name}
              </p>
              <p className="btn btn-secondary flex justify-center items-center md:w-10/12 w-11/12 h-3 md:h-9 p-2">
                {`${homeState.activeAccount.publicKey.slice(0, 30)}....`}
              </p>
              <div className="flex justify-center items-center bg-transparent rounded-md text-white-75 h-20 md:w-10/12 w-11/12 py-20 px-4">
                <div className="details-address">
                  <div className="flex space-x-2">
                    <p className="text-white text-xs md:text-sm">
                      This account will be removed from your wallet. Please make
                      sure you have the original Secret Recovery Phrase or
                      private key for this imported account before continuing.
                      You can import or create accounts again from the account
                      drop-down.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-footer cursor-pointer flex space-x-5 justify-end">
                <div
                  className="btn-secondary text-base w-auto space-x-3 py-1 px-3 rounded-lg right-0 hover:text-red text-white"
                  onClick={() => (setIsOpen(false), closeModal(false))}
                >
                  Nevermind
                </div>
                <div
                  className="btn-primary text-base w-auto space-x-3 py-1 px-6 rounded-lg text-white"
                  onClick={() => removeAccount()}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
