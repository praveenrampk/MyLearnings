import { Menu } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Lock, Search, MenuBar } from '@src/assets/img';
import {
  GENERAL_ROUTE,
  IMPORT_ACCOUNT_ROUTE,
  LOCK_ROUTE,
  NEW_ACCOUNT_ROUTE,
  ONBOARDING_ROUTE,
} from '@src/helpers/constants/routes';
import { Account } from '@src/interfaces-and-types/home-state';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import {
  homeSelectors,
  lockWallet,
  updateAccountDetails,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import {
  fetchOnboardingState,
  onboardingSelectors,
} from '@src/pages/onboarding-flow/onboardingSlice';
import {
  fetchSettingsState,
  settingsSelectors,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { getShape } from '@src/services/utils';

import Logo from '../icons/logo';
import Loader from '../loader';
import AutoLockTimer from '../securityPrivacy/privacy/auto-lock-timer';

import NetworkDropdown from './network-dropdown';

const Header = () => {
  const appDispatch = useAppDispatch();
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [isNetworkEnabled, toggleNetwork] = useState(false);
  const [search, setSearch] = useState('');
  const [copyAccounts, setCopyAccounts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const getAccountState = useCallback(async () => {
    try {
      await appDispatch(fetchOnboardingState()).unwrap();
      await appDispatch(fetchSettingsState()).unwrap();
      setLoading(false);

      if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED)
        navigate(ONBOARDING_ROUTE);
      else if (!homeState.isLogedIn) navigate(LOCK_ROUTE);

      await appDispatch(
        updateActiveAccount({
          account: homeState.activeAccount,
          networkName: settingsState.networks.activeNet.name,
        })
      ).unwrap();

      await appDispatch(
        updateAccountDetails({
          accounts: homeState.accounts,
          networkName: settingsState.networks.activeNet.name,
        })
      ).unwrap();
    } catch (err) {
      setLoading(false);
    }
  }, [appDispatch, fetchOnboardingState, fetchOnboardingState]);

  useEffect(() => {
    getAccountState();
  }, [getAccountState]);

  useEffect(() => {
    if (search.length) {
      setCopyAccounts([
        ...homeState.accounts.filter(
          (acc) =>
            acc.name.toLowerCase().includes(search.toLowerCase()) ||
            acc.publicKey === search
        ),
      ]);
    } else {
      setCopyAccounts([...homeState.accounts]);
    }
  }, [search, homeState]);

  const handleOpenMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSearch('');
    setAnchorEl(null);
  };

  return onboardingState.onboardingStatus !==
    OnboardingStatus.COMPLETED ? null : loading ? (
    <Loader />
  ) : (
    <div className="header">
      <div className="flex w-full justify-between gap-2 px-2">
        <div className="flex gap-2">
          <Logo color="white" height="32" width="32" />
          <div className="header-text">HedgeHogg</div>
        </div>
        <div className="flex gap-x-5">
          <NetworkDropdown
            toggleNetwork={toggleNetwork}
            isNetworkEnabled={isNetworkEnabled}
          />
          <div className="menu">
            <div className="card">
              <div className="flex gap-2">
                <img
                  className="h-5 w-5"
                  src={MenuBar}
                  onClick={async (event) => {
                    handleOpenMenu(event);
                    await appDispatch(fetchSettingsState()).unwrap();

                    await appDispatch(
                      updateAccountDetails({
                        accounts: homeState.accounts,
                        networkName: settingsState.networks.activeNet.name,
                      })
                    ).unwrap();
                  }}
                />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleCloseMenu()}
                className="menu-container"
              >
                <div className="menu-header">
                  <div className="text-xl text-primary py-2 px-4">
                    My Accounts
                  </div>
                  <div
                    className="flex items-center justify-center header-text w-10 cursor-pointer"
                    onClick={async () => {
                      await appDispatch(lockWallet()).unwrap();
                      navigate(LOCK_ROUTE);
                    }}
                  >
                    <img src={Lock} onClick={() => handleCloseMenu()} />
                  </div>
                </div>
                <div className="menu-content">
                  <div className="search-bar">
                    <img className="cursor-pointer h-4 w-4" src={Search} />
                    <input
                      className="input-container"
                      type="text"
                      placeholder="Search your accounts"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                  <div className="account-list space-y-2">
                    {copyAccounts.length ? (
                      copyAccounts.map((account: Account, index) => (
                        <div
                          className="list cursor-pointer"
                          key={index}
                          onClick={async () => {
                            await appDispatch(
                              updateActiveAccount({
                                account: {
                                  ...account,
                                  lastSelected: Date.now(),
                                },
                                networkName:
                                  settingsState.networks.activeNet.name,
                              })
                            ).unwrap();
                            handleCloseMenu();
                          }}
                        >
                          <div className="view-start">
                            <div className="view-symbol justify-between">
                              <img
                                src={getShape(account.publicKey)}
                                alt="avatar"
                                className="h-9 w-9 rounded-full"
                              />
                            </div>
                            <div className="view-info">
                              <p className="text-base text-white font-medium">
                                {`${account.name}`}
                              </p>
                              <p className="text-sm text-white-45 truncate">
                                {`${account.balance.bal} ${settingsState.networks.activeNet.symbol}`}
                              </p>
                            </div>
                            {account.privateKeyOrPhrase && (
                              <div className="view-end flex-col">
                                <div className="flex w-full items-center justify-end">
                                  <p className="text-xs text-white-75 font-bold border border-primary rounded-md px-1">
                                    Imported
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center divide-y divide-white-10">
                        <p className="flex text-base text-white font-medium p-4">
                          No account found for the given search query
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="menu-footer">
                    <div className="account-actions">
                      <div
                        className="btn btn-primary flex justify-center items-center"
                        onClick={() => {
                          handleCloseMenu();
                          navigate(NEW_ACCOUNT_ROUTE);
                        }}
                      >
                        Create account
                      </div>
                      <div
                        className="btn btn-secondary flex justify-center items-center"
                        onClick={() => {
                          handleCloseMenu();
                          navigate(IMPORT_ACCOUNT_ROUTE);
                        }}
                      >
                        Import account
                      </div>
                      <div
                        className="btn btn-secondary flex justify-center items-center"
                        onClick={() => {
                          handleCloseMenu();
                          navigate(GENERAL_ROUTE);
                        }}
                      >
                        Settings
                      </div>
                    </div>
                  </div>
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <AutoLockTimer />
    </div>
  );
};

export default Header;
