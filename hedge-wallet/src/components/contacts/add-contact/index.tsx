import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '@src/components/loader';
import { addContactAtIndex, checkContactExistOrNot } from '@src/helpers';
import { LOCK_ROUTE, ONBOARDING_ROUTE } from '@src/helpers/constants/routes';
import { CreateContactProps } from '@src/interfaces-and-types/contacts';
import { ContactDetails } from '@src/interfaces-and-types/home-state';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import {
  fetchAccountsState,
  homeSelectors,
  updateAccountDetails,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import {
  fetchOnboardingState,
  onboardingSelectors,
} from '@src/pages/onboarding-flow/onboardingSlice';
import { settingsSelectors } from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { truncateWordAtIndex, validateAddress } from '@src/services/utils';

const CreateNewContact: FC<CreateContactProps> = ({ showPopups }) => {
  const appDispatch = useAppDispatch();
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [errorMsgName, setErrMsgName] = useState<string | null>(null);
  const [errorMsgAdd, setErrMsgAdd] = useState<string | null>(null);

  const [timer1, setTimer1] = useState(null);
  const [timer2, setTimer2] = useState(null);

  const deleteRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      showPopups(false);
    }
  };

  const getSettingsState = useCallback(async () => {
    try {
      await appDispatch(fetchOnboardingState()).unwrap();
      await appDispatch(fetchAccountsState()).unwrap();
      setLoading(false);

      if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED)
        navigate(ONBOARDING_ROUTE);
      else if (!homeState.isLogedIn) navigate(LOCK_ROUTE);
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

  useEffect(() => {
    clearTimeout(timer1);
    setErrMsgName(null);

    const newTimer = setTimeout(() => {
      if (
        username.length &&
        !checkContactExistOrNot(homeState.activeAccount.contacts, username)
      ) {
        setErrMsgName('User name already taken');
      } else {
        setErrMsgName(null);
      }
    }, 1000);
    setTimer1(newTimer);
  }, [username]);

  useEffect(() => {
    clearTimeout(timer2);
    setErrMsgAdd(null);

    const newTimer = setTimeout(() => {
      if (address.length) {
        if (validateAddress(address)) {
          setErrMsgAdd(null);
        } else {
          setErrMsgAdd(
            `Invalid bech32: ${truncateWordAtIndex(address, 4)} too short`
          );
        }
      } else {
        setErrMsgAdd(null);
      }
    }, 1000);
    setTimer2(newTimer);
  }, [address]);

  const createContact = async () => {
    try {
      if (!errorMsgName && !errorMsgAdd) {
        if (username.length && address.length) {
          setLoading(true);

          const newContact: ContactDetails = {
            username,
            address,
            memo,
          };

          const contacts: Record<string, ContactDetails> = homeState
            .activeAccount.contacts
            ? { ...homeState.activeAccount.contacts, [address]: newContact }
            : { [address]: newContact };

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
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
      <div className="fixed inset-0 bg-white-75 dark:bg-black opacity-50"></div>
      <div ref={deleteRef} className="contactModal">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col space-y-6 justify-between flex-1">
            <div className="flex flex-col mt-5 justify-center items-center space-y-8 h-full w-full">
              <p className="text-2xl text-black-10 dark:text-white-75 font-semibold">
                New Contact
              </p>
              <div className="flex flex-col space-y-8 h-full w-full">
                <div className="flex flex-col space-y-1 px-5">
                  <p className="text-base text-white-75 text-black-10">
                    Username
                  </p>
                  <div className="bg-transparent border dark:border-white-10 border-black-10 rounded-md h-12 w-full space-y-2">
                    <input
                      className="h-full w-full p-2 bg-transparent text-lg dark:text-white-75 text-black-10"
                      placeholder="Example (Praveen)"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="-mt-1.5 text-sm text-red">{errorMsgName}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 px-5">
                  <p className="text-base dark:text-white-75 text-black-10"></p>
                  <p className="text-base text-white-75 text-black-10">
                    Hedge Hogg public address
                  </p>
                  <div className="bg-transparent border dark:border-white-10 border-black-10 rounded-md h-12 w-full space-y-2">
                    <input
                      className="h-full w-full p-2 bg-transparent text-lg dark:text-white-75 text-black-10"
                      placeholder="Enter the public address (calib..)"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p className="-mt-1.5 text-sm text-red">{errorMsgAdd}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 px-5">
                  <p className="text-base text-white-75 text-black-10">
                    {`Memo (Optional)`}
                  </p>
                  <div className="bg-transparent border dark:border-white-10 border-black-10 rounded-md h-20 w-full space-y-2">
                    <input
                      className="h-full w-full p-2 bg-transparent text-lg dark:text-white-75 text-black-10"
                      type="text"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row p-2 justify-evenly">
                <div
                  className="w-40 py-4 text-sm text-primary text-center bg-transparent border border-primary rounded-3xl cursor-pointer"
                  onClick={() => showPopups(false)}
                >
                  Cancel
                </div>
                <div
                  className="w-40 py-4 text-sm dark:text-black text-white-75 bg-primary border text-center border-primary rounded-3xl cursor-pointer"
                  onClick={() => createContact()}
                >
                  Create
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewContact;
