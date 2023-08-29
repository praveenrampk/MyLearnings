import { Menu } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Copied from '@assets/img/copied.svg';
import Copy from '@assets/img/copy.svg';
import { More, Expand, QR, Patterns } from '@src/assets/img';
import AccountDetails from '@src/components/home-vertical-menu/accounts-details/EditAccountName';
import ConnectedSites from '@src/components/home-vertical-menu/connected-sites';
import DeleteAccount from '@src/components/home-vertical-menu/delete-account';
import Connected from '@src/components/icons/connected';
import Delete from '@src/components/icons/delete';
import SendIcon from '@src/components/icons/send';
import Tokens from '@src/components/icons/tokens';
import Loader from '@src/components/loader';
import TransactionDetails from '@src/components/transaction-details';
import { themeChanger } from '@src/features/theme/theme-changer';
import {
  ASSET_ROUTE,
  CONTACT_ROUTE,
  DEFAULT_ROUTE,
  LOCK_ROUTE,
  ONBOARDING_ROUTE,
} from '@src/helpers/constants/routes';
import { HEDGE_CHAIN, MENU, test } from '@src/helpers/misc';
import { TxDetails } from '@src/interfaces-and-types/home-state';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { updateCurrentAccount } from '@src/services/connect-sites';
import { convertOneCurrencyToOther } from '@src/services/networks';
import { getShape, truncateWordAtIndex } from '@src/services/utils';

import { onboardingSelectors } from '../onboarding-flow/onboardingSlice';
import {
  fetchSettingsState,
  settingsSelectors,
} from '../settings/settingsSlice';

import {
  fetchAccountsState,
  homeSelectors,
  updateActiveAccount,
} from './homeSlice';

import '@styles/popup.scss';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(MENU.ASSETS);
  const [copy, setCopy] = useState(false);
  const [isSiteEnabled, enableSite] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [accountDetails, setAccountDetails] = useState(false);
  const [txDetails, setTxDetails] = useState<TxDetails | null>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [shape, setShape] = useState('');
  const [color, setColor] = useState(false);
  const [conversion, setConversion] = useState(0);

  const appDispatch = useAppDispatch();
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getAccountState = useCallback(async () => {
    // console.log('active account: ', homeState.activeAccount);

    try {
      await appDispatch(fetchAccountsState()).unwrap();
      await appDispatch(fetchSettingsState()).unwrap();
      themeChanger(settingsState.general[3].dropdown[0].toLowerCase());
      setLoading(false);

      if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED)
        navigate(ONBOARDING_ROUTE);
      else if (!homeState.isLogedIn) navigate(LOCK_ROUTE);

      await appDispatch(
        updateActiveAccount({
          account: updateCurrentAccount(
            homeState.accounts,
            homeState.activeAccount
          ),
          networkName: settingsState.networks.activeNet.name,
        })
      ).unwrap();

      setConversion(
        await convertOneCurrencyToOther(
          settingsState.networks.activeNet.name,
          settingsState.general[0].dropdown[0]
            .replaceAll(' ', '')
            .split('-')[0]
            .toLowerCase()
        )
      );
    } catch (err) {
      null;
    }
  }, [appDispatch, fetchSettingsState, navigate, setLoading]);

  useEffect(() => {
    getAccountState();
  }, [getAccountState]);

  useEffect(() => {
    if (homeState.activeAccount) {
      setShape(getShape(homeState.activeAccount.publicKey));
    }
  }, [homeState]);

  return loading ? (
    <Loader />
  ) : (
    <div className="home-container">
      <div className="home-body">
        <div className="dashboard-container">
          <div className="card">
            <div className="flex justify-between account-section">
              <div className="icon">
                <img
                  src={shape}
                  alt="avatar"
                  className="h-12 w-14 rounded-full bg-white"
                />
              </div>
              <div
                className="details hover:bg-white-10 hover:rounded-md hover:cursor-pointer hover:md:px-12 hover:px-5"
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
                <div className="details-name px-8 font-bold">
                  {homeState.activeAccount.name}
                </div>
                <div className="details-address">
                  <div className="flex space-x-2 space-y-1">
                    <p>
                      {truncateWordAtIndex(
                        homeState.activeAccount.publicKey,
                        6
                      )}
                    </p>
                    <img
                      src={copy ? Copied : Copy}
                      className={`h-4 w-4 ${copy && 'bg-green rounded-xl'}`}
                    />
                  </div>
                </div>
              </div>
              <img
                className="h-5 w-5 hover:cursor-pointer"
                src={More}
                onClick={(event) => handleOpenMenu(event)}
              />
            </div>
            <div className="flex w-full justify-between gap-2 px-2">
              <div className="menu">
                <div className="card">
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleCloseMenu()}
                    className="menu-container"
                  >
                    <div className="menu-content">
                      <>
                        {chrome.extension.getViews({ type: 'popup' }).length >
                          0 && (
                          <div
                            className="moreOutline-container"
                            onClick={() =>
                              window.open(
                                `chrome-extension://${chrome.runtime.id}/src/popup.html#${DEFAULT_ROUTE}`,
                                '_blank'
                              )
                            }
                          >
                            <img className="h-5 w-5" src={Expand} />
                            <p>Expanded view</p>
                          </div>
                        )}
                        <div
                          className="moreOutline-container"
                          onClick={() => {
                            setAccountDetails(true);
                            handleCloseMenu();
                          }}
                        >
                          <img className="h-4 w-4" src={QR} />
                          <p>Account details</p>
                        </div>
                        <div
                          className="moreOutline-container"
                          onClick={() => (enableSite(true), handleCloseMenu())}
                        >
                          <Connected />
                          <p>Connected sites</p>
                        </div>
                        {homeState.activeAccount.privateKeyOrPhrase && (
                          <div
                            className="moreOutline-container"
                            onMouseEnter={() => setColor(true)}
                            onMouseLeave={() => setColor(false)}
                            onClick={() => {
                              setDeleteAccount(true);
                              setColor(false);
                              handleCloseMenu();
                            }}
                          >
                            <Delete color={color ? '#000000' : '#ffffff'} />
                            <p>Delete account</p>
                          </div>
                        )}
                      </>
                    </div>
                  </Menu>
                  {accountDetails && (
                    <AccountDetails closeModal={setAccountDetails} />
                  )}
                  {deleteAccount && (
                    <DeleteAccount closeModal={setDeleteAccount} />
                  )}
                  {txDetails && (
                    <TransactionDetails
                      txDetails={txDetails}
                      closeTxModal={setTxDetails}
                    />
                  )}
                  {isSiteEnabled && <ConnectedSites showPopups={enableSite} />}
                </div>
              </div>
            </div>
            <div className="balance-section">
              <div className="balance-details">
                <div className="title">My Balance</div>
                <div className="balance-container">
                  <div className="balance">
                    {settingsState.general[1].radio.primary
                      ? `${
                          homeState.activeAccount.balance.bal
                            ? homeState.activeAccount.balance.bal
                            : 0
                        } ${settingsState.networks.activeNet.symbol}`
                      : `${
                          conversion *
                          Number(homeState.activeAccount.balance.bal)
                        } ${
                          settingsState.general[0].dropdown[0].split('-')[0]
                        }`}
                  </div>
                  <div className="balance">{`${homeState.activeAccount.balance.stake} STAKE`}</div>
                  <div className="balance-converted">
                    {settingsState.securityPrivacy.privacy[0].toggle &&
                      (settingsState.general[1].radio.primary
                        ? `${
                            conversion *
                            Number(homeState.activeAccount.balance.bal)
                          } ${
                            settingsState.general[0].dropdown[0].split('-')[0]
                          }`
                        : `${
                            homeState.activeAccount.balance.bal
                              ? homeState.activeAccount.balance.bal
                              : 0
                          } ${settingsState.networks.activeNet.symbol}`)}
                  </div>
                </div>
              </div>
              <div className="h-full w-full justify-end items-end opacity-80">
                <img className="h-full w-full" src={Patterns} />
              </div>
            </div>
            <div className="actions-section">
              <div className="action">
                <div className="icon" onClick={() => navigate(CONTACT_ROUTE)}>
                  <SendIcon fill="#fff" />
                </div>
                <div className="title">Send</div>
              </div>
            </div>
            <div className="asset-tx-section">
              <div className="tabs sticky">
                <div
                  className={`tab ${activeTab === MENU.ASSETS && 'active'}`}
                  onClick={() => {
                    setActiveTab(MENU.ASSETS);
                  }}
                >
                  Assets
                </div>
                <div
                  className={`tab ${
                    activeTab === MENU.TRANSACTIONS && 'active'
                  }`}
                  onClick={() => {
                    setActiveTab(MENU.TRANSACTIONS);
                  }}
                >
                  Transactions
                </div>
              </div>
              <div className="list-container divide-y divide-black-10 dark:divide-white-10">
                {activeTab === MENU.ASSETS ? (
                  test[MENU.ASSETS].map((data, index) => (
                    <div key={`${index}-${data.ticker}`} className="list">
                      <div
                        className="view-start"
                        onClick={() => navigate(ASSET_ROUTE)}
                      >
                        <div className="view-symbol">
                          {settingsState.networks.activeNet.chainID ===
                          HEDGE_CHAIN.chainID ? (
                            <Tokens name={data.icon} />
                          ) : (
                            <img
                              className="h-5 w-5"
                              src={settingsState.networks.activeNet.imageURL}
                            />
                          )}
                        </div>
                        <div className="view-info">
                          <p className="text-base text-black-10 dark:text-white font-medium">
                            {/* {data.name} */}
                            {settingsState.networks.activeNet.name}
                          </p>
                          <p className="text-sm text-black-10 dark:text-white-45 truncate">
                            $ {data.balance}
                          </p>
                        </div>
                      </div>
                      <div className="view-end">
                        {settingsState.networks.activeNet.chainID ===
                        HEDGE_CHAIN.chainID
                          ? `${homeState.activeAccount.balance.bal} ${data.ticker}`
                          : `0 ${settingsState.networks.activeNet.symbol}`}
                      </div>
                    </div>
                  ))
                ) : homeState.activeAccount.txHistory &&
                  homeState.activeAccount.txHistory[
                    settingsState.networks.activeNet.chainID
                  ] ? (
                  homeState.activeAccount.txHistory[
                    settingsState.networks.activeNet.chainID
                  ]?.map((data, index) => (
                    <div
                      key={`${index}-${data.txHash}`}
                      className="list"
                      onClick={() => setTxDetails(data)}
                    >
                      <div className="view-start">
                        <div className="view-symbol">
                          <Tokens name={data.type} />
                        </div>
                        <div className="view-info">
                          <p className="text-base text-black-10 dark:text-white font-medium">
                            {truncateWordAtIndex(data.txHash, 4)}
                          </p>
                          <p className="text-sm text-black-10 dark:text-white-45 truncate">
                            {new Date(data.timestamp).toDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="view-end flex-col">
                        <div className="flex w-full items-center justify-end">
                          {data.type === 'send' ? '-' : '+'}
                          {`${data.amount} ${data.asset}`}
                        </div>
                        <div className={`currency ${data.type}`}>
                          ${data.price} USD
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex p-16 md:py-20 md:px-32">
                    <p className="text-black-10 dark:text-white-75 text-sm md:text-lg font-bold">
                      You have no transactions
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
