import QRCode from 'qrcode.react';
import { FC, useState, useRef, useEffect, useCallback } from 'react';

import { Confirm, Copied, Copy, Edit, Wrong } from '@src/assets/img';
import Loader from '@src/components/loader';
import { AccountDetailsModalClose } from '@src/interfaces-and-types/components';
import { Account } from '@src/interfaces-and-types/home-state';
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
import { getShape, truncateWordAtIndex } from '@src/services/utils';

import ExportPrivateKey from './PrivateKeyExport';

const AccountDetails: FC<AccountDetailsModalClose> = ({ closeModal }) => {
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const appDispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(homeState.activeAccount.name);
  const [editName, setEditName] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [copy, setCopy] = useState(false);
  const [isKeyViewed, setIsKeyViewed] = useState(false);
  const [shape, setShape] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const handleOnKeyDownOrConfirm = () => {
    !errMsg
      ? homeState.activeAccount.name === name
        ? setEditName(false)
        : updateAccountName()
      : setTimeout(() => inputRef.current.focus(), 500);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
      closeModal(false);
    }

    if (inputRef.current && !inputRef.current.contains(event.target))
      handleOnKeyDownOrConfirm();
  };

  const getHomeStateValues = useCallback(async () => {
    try {
      setLoading(false);
      await appDispatch(fetchAccountsState()).unwrap();
      await appDispatch(fetchSettingsState()).unwrap();

      setErrMsg(
        name.length > 3
          ? name === homeState.activeAccount.name
            ? null
            : homeState.accounts.findIndex(
                (account) => account.name === name
              ) === -1
            ? null
            : 'This Account name already exists.'
          : 'Name must have atleast 4 chars'
      );
    } catch (err) {
      null;
    }
  }, [name]);

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

  const updateAccountName = async () => {
    setLoading(true);
    await appDispatch(fetchSettingsState()).unwrap();

    const index = homeState.accounts.findIndex(
      (account) => account.publicKey === homeState.activeAccount.publicKey
    );
    const accounts: Account[] = [...homeState.accounts];
    const account: Account = { ...accounts.splice(index, 1).pop(), name: name };
    accounts.splice(index, 0, account);

    setEditName(false);

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
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      {isOpen &&
        (!isKeyViewed ? (
          <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div ref={modalRef} className="modal">
              <div className="flex justify-between items-center p-4">
                <img className="h-10 w-10 bg-white rounded-full" src={shape} />
                <div className="flex items-center space-y-6">
                  <div
                    className={`flex text-xl space-x-2 ${
                      editName ? 'md:px-14 px-3' : 'md:px-20 px-8'
                    }`}
                  >
                    {!editName ? (
                      <>
                        <p className="text-xl text-white-75 font-bold">
                          {homeState.activeAccount.name}
                        </p>
                        <img
                          className="h-5 w-5 my-1 cursor-pointer"
                          src={Edit}
                          onClick={() => setEditName(true)}
                        />
                      </>
                    ) : (
                      <>
                        <div className="relative">
                          <input
                            ref={inputRef}
                            className={`h-7 md:h-9 md:w-40 ${
                              editName && 'w-32'
                            } text-base font-bold text-center bg-transparent border border-solid ${
                              errMsg === null ? 'border-white-35' : 'border-red'
                            } rounded-md text-white-75`}
                            placeholder={`${homeState.activeAccount.name}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === 'Enter' && handleOnKeyDownOrConfirm()
                            }
                          />
                          {errMsg && (
                            <p className="absolute text-red md:text-sm text-xs text-center md:-bottom-12 -bottom-8">
                              {errMsg}
                            </p>
                          )}
                        </div>
                        <img
                          className="h-5 w-5 my-2 cursor-pointer"
                          src={Confirm}
                          onClick={() => handleOnKeyDownOrConfirm()}
                        />
                      </>
                    )}
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
              <div className="flex flex-col items-center justify-center flex-1 space-y-6">
                <QRCode value={homeState.activeAccount.publicKey} />
                <div
                  className="btn btn-secondary flex justify-center items-center"
                  title="copy to clipboard"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      homeState.activeAccount.publicKey
                    );
                    setCopy(true);

                    setTimeout(() => {
                      setCopy(false);
                    }, 2000);
                  }}
                >
                  <div className="details-address">
                    <div className="flex space-x-2">
                      <p className="text-white">
                        {truncateWordAtIndex(
                          homeState.activeAccount.publicKey,
                          7
                        )}
                      </p>
                      <img
                        src={copy ? Copied : Copy}
                        className={`h-4 w-4 ${copy && 'bg-green rounded-xl'}`}
                      />
                    </div>
                  </div>
                  <div className="h-4"></div>
                </div>
                <div
                  className="btn btn-primary flex justify-center items-center"
                  onClick={() => setIsKeyViewed(true)}
                >
                  Export private key
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ExportPrivateKey closeModal={closeModal} back={setIsKeyViewed} />
        ))}
    </div>
  );
};

export default AccountDetails;
