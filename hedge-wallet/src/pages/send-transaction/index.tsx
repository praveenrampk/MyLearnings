import { ClipboardEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Search, Warning } from '@src/assets/img';
import ReceiveIcon from '@src/components/icons/receive';
import Loader from '@src/components/loader';
import { DEFAULT_ROUTE, ONBOARDING_ROUTE } from '@src/helpers/constants/routes';
import { Account } from '@src/interfaces-and-types/home-state';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import {
  fetchAccountsState,
  homeSelectors,
  updateAccountDetails,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import {
  estimatedGasFees,
  initiateTransaction,
} from '@src/services/transactions';
import {
  getCurrentConversionOfUsdToETH,
  truncateWordAtIndex,
  validateAddress,
} from '@src/services/utils';

import {
  fetchOnboardingState,
  onboardingSelectors,
} from '../onboarding-flow/onboardingSlice';
import '@styles/global.scss';
import {
  fetchSettingsState,
  settingsSelectors,
} from '../settings/settingsSlice';

const TranferFunds = () => {
  const [receiver, setReceiver] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [inputErrMsg, setInputErrMsg] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [coin, setCoin] = useState<string>('');
  const [txSpeed, setTxSpeed] = useState('slow');
  const [showMyAccounts, setShowMyAccounts] = useState<boolean | number>(false);
  const navigate = useNavigate();

  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);
  const appDispatch = useAppDispatch();

  const handleAddressSearchQuery = useCallback(async () => {
    if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED) {
      navigate(ONBOARDING_ROUTE);

      return;
    }
    await appDispatch(fetchAccountsState()).unwrap();
    setLoading(false);

    if (search.length > 40) {
      try {
        const isLocalAcc = homeState.accounts
          .filter((acc) => acc.publicKey.includes(search))
          .pop().name;

        setReceiver(`${isLocalAcc} ✅`);
        setShowMyAccounts(-1);
      } catch (err) {
        const validated = validateAddress(search);
        setReceiver(validated ? 'Valid Address ✅' : 'Invalid Address');
        setShowMyAccounts(validated ? -1 : false);

        return;
      }
    } else {
      setReceiver('Invalid Address');
      setShowMyAccounts(false);
    }
    !search.length && setReceiver(null);
  }, [search]);

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedAddress = event.clipboardData
      .getData('text')
      .replace(/\n/g, '')
      .trim();

    validateAddress(pastedAddress)
      ? (setReceiver('Valid Address ✅'), setShowMyAccounts(-1))
      : setReceiver('Invalid Address');

    setSearch(pastedAddress);
  };

  const checkAvailableFunds = useCallback(async () => {
    await appDispatch(fetchAccountsState()).unwrap();
    await appDispatch(fetchSettingsState()).unwrap();

    try {
      Number(coin) > Number(homeState.activeAccount.balance.bal)
        ? setInputErrMsg('Insufficient funds')
        : setInputErrMsg('Fund available');
    } catch (err) {
      null;
    }
    !coin && setInputErrMsg('Enter the Amount');
  }, [coin]);

  const getSettingsStateValues = useCallback(async () => {
    try {
      await appDispatch(fetchOnboardingState()).unwrap();
    } catch (err) {
      null;
    }
  }, [appDispatch]);

  useEffect(() => {
    handleAddressSearchQuery();
  }, [handleAddressSearchQuery]);

  useEffect(() => {
    checkAvailableFunds();
    getSettingsStateValues();
  }, [checkAvailableFunds, getSettingsStateValues]);

  return (
    <div className="send-container">
      <div className="send-body">
        <div className="send-inner-container">
          <div className="card">
            <div className="send-header">
              <div className="title-bar">
                <div className="title">Send to #</div>
                <button
                  className="btn-secondary no-border flex justify-center items-center p-2 w-auto hover:text-red"
                  onClick={() => {
                    navigate(DEFAULT_ROUTE);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="address-container">
                <div className="input-container">
                  <div
                    className={`placeholder text-sm ${
                      receiver
                        ? 'flex items-center ' +
                          (receiver ? 'text-red' : 'text-green')
                        : 'text-lg'
                    }`}
                  >
                    {receiver === 'Invalid Address' && (
                      <img className="cursor-pointer text-sm" src={Warning} />
                    )}
                  </div>
                  <img className="h-5 w-5" src={Search} alt="search-icon" />
                  <input
                    className="password-input text-lg p-2"
                    placeholder="Search, public address(calib)"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onPaste={(e) => handlePaste(e)}
                  />
                </div>
              </div>
            </div>
            <div className="accounts-list no-bg">
              <button
                className="transfer-self"
                onClick={(e) => {
                  e.preventDefault();

                  setShowMyAccounts((prev) =>
                    prev === -1 ? true : !showMyAccounts
                  );
                }}
              >
                {showMyAccounts === true
                  ? 'Back to all'
                  : !showMyAccounts
                  ? 'Transfer between my accounts'
                  : 'Edit Receiver'}
              </button>
              {showMyAccounts === true && (
                <div className="content text-sm py-2">
                  <div className="asset-tx-section">
                    <div className="tabs sticky">
                      <div className="text-white text-lg">My accounts</div>
                    </div>
                    <div className="list-container divide-y divide-white-10 h-60 overflow-auto py-5">
                      {homeState.accounts.map(
                        (data, index) =>
                          data.publicKey !==
                            homeState.activeAccount.publicKey && (
                            <div
                              key={index}
                              className="list cursor-pointer"
                              onClick={() => {
                                setSearch(data.publicKey);
                                setShowMyAccounts(!showMyAccounts);
                                setReceiver(data.name);
                              }}
                            >
                              <div className="view-start">
                                <div className="view-info">
                                  <p className="text-base text-white font-medium">
                                    {data.name}
                                  </p>
                                  <p className="text-sm text-white-45">
                                    {truncateWordAtIndex(data.publicKey, 7)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              )}
              {showMyAccounts === -1 && (
                <div className="content text-sm py-2 overflow-auto">
                  <div className="asset-tx-section">
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between p-2">
                          <div className="text-white-85 text-xl">Receiver</div>
                          <div className="flex flex-col text-white text-lg w-36">
                            {truncateWordAtIndex(search, 6)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <div className="text-white-85 text-xl">Sender</div>
                          <div className="flex flex-col text-white text-lg w-36">
                            {homeState.activeAccount.name}
                            <div className="flex text-ellipsis overflow-hidden text-white-65 text-sm">
                              {truncateWordAtIndex(
                                homeState.activeAccount.publicKey,
                                7
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2">
                          <div className="text-white-85 text-xl">Coin</div>
                          <div className="flex flex-col text-white text-lg w-36">
                            {homeState.activeAccount.balance.bal} HEDGE
                            <div className="flex text-ellipsis overflow-hidden text-white-65 text-sm">
                              Stake : {homeState.activeAccount.balance.stake}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-5 w-full border-b border-white-15"></div>
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <div className="flex flex-col p-2 gap-y-4">
                            <div className="flex justify-start gap-x-2">
                              <p className="text-xl text-white-85">
                                Choose your transaction type
                              </p>
                              <div className="mt-2">
                                <ReceiveIcon fill={'white'} />
                              </div>
                            </div>
                            <div className="flex justify-evenly">
                              <div
                                className={`${
                                  txSpeed === 'slow'
                                    ? 'bg-orange-700 border-orange-700'
                                    : 'border-orange-700'
                                } md:px-8 md:py-3 px-5 py-2 border rounded-lg cursor-pointer`}
                                onClick={() => setTxSpeed('slow')}
                              >
                                <p
                                  className={`${
                                    txSpeed === 'slow'
                                      ? 'text-black'
                                      : 'text-orange-700'
                                  } md:text-sm text-xs`}
                                >
                                  SLOW
                                </p>
                              </div>
                              <div
                                className={`${
                                  txSpeed === 'medium'
                                    ? 'bg-primary border-primary'
                                    : 'border-primary'
                                } md:px-5 md:py-3 px-3 py-2 border rounded-lg cursor-pointer`}
                                onClick={() => setTxSpeed('medium')}
                              >
                                <p
                                  className={`${
                                    txSpeed === 'medium'
                                      ? 'text-black'
                                      : 'text-primary'
                                  } md:text-sm text-xs`}
                                >
                                  MEDIUM
                                </p>
                              </div>
                              <div
                                className={`${
                                  txSpeed === 'fast'
                                    ? 'bg-green border-green'
                                    : 'border-green'
                                } md:px-8 md:py-3 px-5 py-2 border rounded-lg cursor-pointer`}
                                onClick={() => (
                                  setTxSpeed('fast'),
                                  estimatedGasFees(
                                    txSpeed,
                                    settingsState.networks.activeNet
                                      .addressPrefix
                                  )
                                )}
                              >
                                <p
                                  className={`${
                                    txSpeed === 'fast'
                                      ? 'text-black'
                                      : 'text-green'
                                  } md:text-sm text-xs`}
                                >
                                  HIGH
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="h-5 w-full border-b border-white-15"></div>
                          <div className="flex mt-5 items-center justify-between p-2">
                            <div className="text-white-85 text-xl -mt-7">
                              Amount
                            </div>
                            <div className="flex flex-col text-white text-lg w-48">
                              <input
                                className="flex bg-transparent h-10 w-full text-white-75 p-1 border-2 border-white-10 rounded-md"
                                value={coin}
                                onChange={(e) => setCoin(e.target.value)}
                                placeholder="0"
                                type="number"
                              />
                              {inputErrMsg && inputErrMsg.length > 0 && (
                                <div
                                  className={`flex items-center justify-start text-xs p-2 ${
                                    inputErrMsg === 'Insufficient funds'
                                      ? 'text-red'
                                      : inputErrMsg === 'Fund available'
                                      ? 'text-green'
                                      : 'text-white-75'
                                  }`}
                                >
                                  {inputErrMsg}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-10 p-2 border border-white-15 rounded-lg">
                            <div className="flex flex-col gap-y-4">
                              <div className="flex flex-row justify-between">
                                <p className="text-lg text-white-85">
                                  {'Gas (estimated)'}
                                </p>
                                <p className="text-lg text-white-85">
                                  {Number(
                                    estimatedGasFees(
                                      txSpeed,
                                      settingsState.networks.activeNet
                                        .addressPrefix
                                    )
                                  ) / 1000000}
                                </p>
                              </div>
                              <div className="flex flex-row justify-between">
                                <p className="text-sm text-green">
                                  {'Likely in < 30 seconds'}
                                </p>
                                <div className="flex justify-between gap-x-2">
                                  <p className="text-sm text-white-85 font-semibold">
                                    Max fee:
                                  </p>
                                  <p className="text-sm text-white-65">
                                    0.1111
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {settingsState.advanced[2].toggleSwitch && (
                            <div className="h-24 w-full p-2 mt-4 border border-white-15 rounded-lg">
                              <div className="flex flex-row justify-between">
                                <p className="text-lg text-white-85 justify-center">
                                  Hex Data
                                </p>
                                <div className="h-16 w-48 bg-transparent border border-white-10 rounded-lg">
                                  <input
                                    className="h-full w-full p-2 bg-transparent text-white-85 text-lg"
                                    placeholder="Optional"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer cursor-pointer flex space-x-5 justify-end">
              <div
                className="btn-secondary text-base w-auto p-2 px-4 rounded-lg right-0 hover:text-red text-white"
                onClick={() => {
                  navigate(DEFAULT_ROUTE);
                }}
              >
                back
              </div>
              <div
                className="btn-primary text-base w-auto p-2 px-4 rounded-lg text-white"
                onClick={async () => {
                  if (inputErrMsg !== 'Insufficient funds' && coin.length) {
                    setLoading(true);

                    const txResult = await initiateTransaction(
                      homeState.activeAccount,
                      onboardingState.secretPhrase.phrase.masterKey,
                      String(coin),
                      search,
                      txSpeed,
                      settingsState.networks.activeNet.rpc,
                      settingsState.networks.activeNet.addressPrefix
                    );

                    const accAccount = {
                      ...homeState.activeAccount,
                      txHistory: {
                        ...homeState.activeAccount.txHistory,
                        [settingsState.networks.activeNet.chainID]: [
                          ...(homeState.activeAccount.txHistory &&
                          homeState.activeAccount.txHistory[
                            settingsState.networks.activeNet.chainID
                          ]
                            ? homeState.activeAccount.txHistory[
                                settingsState.networks.activeNet.chainID
                              ]
                            : []),
                          {
                            type: 'send',
                            txHash: txResult.transactionHash,
                            timestamp: Date.now(),
                            amount: Number(coin),
                            asset: settingsState.networks.activeNet.symbol,
                            price: String(
                              (await getCurrentConversionOfUsdToETH()) *
                                Number(coin)
                            ),
                          },
                        ],
                      },
                    };

                    const accounts: Account[] = homeState.accounts.map(
                      (account) => {
                        if (
                          homeState.activeAccount.publicKey ===
                          account.publicKey
                        ) {
                          return accAccount;
                        }

                        return account;
                      }
                    );

                    await appDispatch(
                      updateAccountDetails({
                        accounts,
                        networkName: settingsState.networks.activeNet.name,
                      })
                    );

                    await appDispatch(
                      updateActiveAccount({
                        account: accAccount,
                        networkName: settingsState.networks.activeNet.name,
                      })
                    );
                    setLoading(false);
                    navigate(DEFAULT_ROUTE);
                  }
                }}
              >
                Transfer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranferFunds;
