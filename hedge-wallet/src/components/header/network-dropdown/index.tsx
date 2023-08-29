import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DropDown, Logo, Wrong } from '@src/assets/img';
import Loader from '@src/components/loader';
import ListingNetsOnDropdown from '@src/components/map-added-nets/network-dropdown';
import {
  convertAccountAddresses,
  updateOneFromAdvancedContents,
} from '@src/helpers';
import { ADD_NETWORKS } from '@src/helpers/constants/routes';
import { HEDGE_CHAIN } from '@src/helpers/misc';
import {
  NetworkStatusProps,
  NetworkToBeDeletedProps,
} from '@src/interfaces-and-types/components';
import { NetworksProps } from '@src/interfaces-and-types/onboarding-flow';
import { NetworksStatus } from '@src/interfaces-and-types/settings-state';
import {
  fetchAccountsState,
  homeSelectors,
  updateAccountDetails,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import { onboardingSelectors } from '@src/pages/onboarding-flow/onboardingSlice';
import {
  alterActiveChain,
  alterInAdvancedSettings,
  fetchSettingsState,
  settingsSelectors,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import DeleteNetwork from './delete-network';

const NetworkDropdown: FC<NetworkStatusProps> = ({
  toggleNetwork,
  isNetworkEnabled,
}) => {
  const navigate = useNavigate();

  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);
  const appDispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [showDeleteNetwork, setShowDeleteNetwork] = useState(false);

  const [networkToBeDeleted, setNetworkTobeDeleted] =
    useState<NetworkToBeDeletedProps>();
  const modalRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!modalRef.current?.contains(event.target)) {
      toggleNetwork(false);
    }
  };

  const pickNetwork = async (network: NetworksProps) => {
    setLoading(true);
    await appDispatch(fetchSettingsState()).unwrap();

    const { alteredAccounts, alteredActiveAccount } =
      await convertAccountAddresses(
        [...homeState.accounts],
        onboardingState.secretPhrase.phrase.masterKey,
        homeState.activeAccount,
        network.addressPrefix
      );

    await appDispatch(
      updateActiveAccount({
        account: alteredActiveAccount,
        networkName: network.name,
      })
    );
    await appDispatch(alterActiveChain({ ...network, isUsed: true })).unwrap();

    await appDispatch(
      updateAccountDetails({
        accounts: alteredAccounts,
        networkName: network.name,
      })
    ).unwrap();
    setLoading(false);
    toggleNetwork(false);
  };

  const fetchCurrentNetworkState = useCallback(async () => {
    try {
      setLoading(true);
      await appDispatch(fetchAccountsState()).unwrap();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [appDispatch, setLoading, navigate]);

  useEffect(() => {
    fetchCurrentNetworkState();
    document.addEventListener('mousedown', (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    };
  }, [fetchCurrentNetworkState]);

  return (
    <>
      <div
        className="flex justify-evenly w-52 p-1 bg-transparent border border-black-10 dark:border-white-65 cursor-pointer rounded-3xl"
        onClick={() => toggleNetwork(true)}
      >
        {settingsState.networks.activeNet.chainID === HEDGE_CHAIN.chainID ? (
          <Logo color="white" height="28" width="28" />
        ) : (
          <img
            className="h-8 w-8"
            src={settingsState.networks.activeNet.imageURL}
          />
        )}
        <p className="mt-0.5 text-xl text-black-10 dark:text-white-75">
          {settingsState.networks.activeNet.name}
        </p>
        <img className="mt-2.5 h-3 w-3" src={DropDown} />
      </div>
      {isNetworkEnabled && (
        <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="modal">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col py-2 overflow-auto">
                <div className="flex flex-row justify-evenly items-center border-b border-black-10 dark:border-white-15 px-4 py-1">
                  <div className="flex justify-center items-center w-full">
                    <div className="text-xl text-black-10 dark:text-white-85 font-semibold text-center">
                      Select a network
                    </div>
                  </div>
                  <div
                    className="flex justify-end p-2"
                    onClick={() => toggleNetwork(false)}
                  >
                    <img
                      className="mt-1.5 h-6 w-6 hover:opacity-50 cursor-pointer"
                      src={Wrong}
                    />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="flex flex-col h-full overflow-auto">
                    <div
                      className={`flex p-2 h-full ${
                        HEDGE_CHAIN.chainID ===
                        settingsState.networks.activeNet.chainID
                          ? 'bg-white-15'
                          : 'hover:bg-white-5'
                      } gap-x-2 rounded-md cursor-pointer`}
                      onClick={() => pickNetwork(HEDGE_CHAIN)}
                    >
                      {HEDGE_CHAIN.chainID ===
                      settingsState.networks.activeNet.chainID ? (
                        <div className="h-full w-1 mt-0.5 bg-primary rounded-md"></div>
                      ) : (
                        <div className="px-1"></div>
                      )}
                      <div className="mt-1">
                        <Logo color="white" height="28" width="28" />
                      </div>
                      <p className="mt-1 text-xl text-black-10 dark:text-white-75">
                        Hedge Mainnet
                      </p>
                    </div>
                    {settingsState.networks.mainNets && (
                      <ListingNetsOnDropdown
                        activeNet={settingsState.networks.activeNet}
                        deleteNetwork={setNetworkTobeDeleted}
                        networks={settingsState.networks.mainNets}
                        pickNetwork={pickNetwork}
                        toggleDeleteNet={setShowDeleteNetwork}
                        toggleNetwork={toggleNetwork}
                        status={NetworksStatus.MAIN_NETS}
                      />
                    )}
                    {settingsState.advanced[4].toggleSwitch && (
                      <div className="flex flex-col">
                        <div className="mt-6 h-0.5 w-full bg-white-10"></div>
                        <p className="p-4 text-lg text-black-10 dark:text-white-65 font-semibold">
                          Test networks
                        </p>
                        {settingsState.networks.testNets && (
                          <ListingNetsOnDropdown
                            activeNet={settingsState.networks.activeNet}
                            deleteNetwork={setNetworkTobeDeleted}
                            networks={settingsState.networks.testNets}
                            pickNetwork={pickNetwork}
                            toggleDeleteNet={setShowDeleteNetwork}
                            toggleNetwork={toggleNetwork}
                            status={NetworksStatus.TEST_NETS}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-b border-black-10 dark:border-white-10 w-full"></div>
                <div
                  className="flex flex-row px-4 py-2 gap-x-2 justify-between"
                  onClick={async () => {
                    await appDispatch(
                      alterInAdvancedSettings(
                        updateOneFromAdvancedContents(
                          settingsState.advanced,
                          settingsState.advanced[4].heading
                        )
                      )
                    ).unwrap();
                  }}
                >
                  <p className="text-base text-primary font-medium">
                    Show test networks
                  </p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settingsState.advanced[4].toggleSwitch}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div
                  className="flex justify-center items-center py-4 w-full cursor-pointer"
                  onClick={() => (toggleNetwork(false), navigate(ADD_NETWORKS))}
                >
                  <div className="h-12 w-3/4 bg-transparent border border-primary rounded-2xl">
                    <div className="py-2 text-primary text-base text-center">
                      Add network
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showDeleteNetwork && (
        <DeleteNetwork
          networkData={networkToBeDeleted}
          showNetwork={setShowDeleteNetwork}
          toggleNetwork={toggleNetwork}
          status={networkToBeDeleted.status}
        />
      )}
    </>
  );
};

export default NetworkDropdown;
