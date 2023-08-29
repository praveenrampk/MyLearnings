import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Lock, Logo, Search } from '@src/assets/img';
import RightIcon from '@src/components/icons/rightIcon';
import Loader from '@src/components/loader';
import ListingAddedNets from '@src/components/map-added-nets';
import { ADD_NETWORKS } from '@src/helpers/constants/routes';
import { HEDGE_CHAIN, inputFieldsName } from '@src/helpers/misc';
import { NetworksProps } from '@src/interfaces-and-types/onboarding-flow';
import {
  fetchAccountsState,
  homeSelectors,
  updateActiveAccount,
} from '@src/pages/home/homeSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import { fetchSettingsState, settingsSelectors } from '../settingsSlice';

const Networks = () => {
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [networkDetails, setNetworkDetails] = useState([]);

  const getAccountState = useCallback(async () => {
    try {
      await appDispatch(fetchAccountsState()).unwrap();
      await appDispatch(fetchSettingsState()).unwrap();
      setLoading(false);

      await appDispatch(
        updateActiveAccount({
          account: homeState.activeAccount,
          networkName: settingsState.networks.activeNet.name,
        })
      ).unwrap();
    } catch (err) {
      null;
    }
  }, [appDispatch, setLoading, navigate]);

  useEffect(() => {
    getAccountState();
  }, [getAccountState]);

  const handleNetworkClicking = (clickedNetwork: NetworksProps) => {
    setNetworkDetails([
      clickedNetwork.chainID,
      clickedNetwork.name,
      clickedNetwork.rpc,
      clickedNetwork.rest,
      clickedNetwork.addressPrefix,
      clickedNetwork.nativeDenom,
      clickedNetwork.coinType,
      clickedNetwork.decimals,
      clickedNetwork.blockExplorerURL || '',
    ]);
  };

  useEffect(() => handleNetworkClicking(settingsState.networks.activeNet), []);

  return loading ? (
    <Loader />
  ) : (
    <div className="p-2 mt-5 h-full w-full">
      <div className="flex justify-between ">
        <div className="text-xl text-black-10 dark:text-white-85">Networks</div>
        <div className="-mt-3 border border-primary bg-primary rounded-full">
          <p
            className="text-base text-black-10 dark:text-white-75 px-4 py-2 cursor-pointer"
            onClick={() => navigate(ADD_NETWORKS)}
          >
            Add a network
          </p>
        </div>
      </div>
      <div className="border-b border-solid dark:border-white-10 border-black-10 my-2"></div>
      <div className="flex flex-row justify-between divide-x dark:divide-white-25 divide-black-10 h-full w-full">
        <div className="flex flex-col p-3 gap-y-4">
          <div className="flex border dark:border-white-25 border-black-10 rounded-md p-2">
            <img className="h-5 w-5 mt-3" src={Search} />
            <input
              className="text-sm p-2 text-black-10 dark:text-white-75 h-10 w-80 bg-transparent"
              placeholder="Search for a previously added networks"
            />
          </div>
          {/* "overflow-hidden" */}
          <div className="">
            {/* "overflow-auto" */}
            <div className="h-96">
              <div className="flex flex-col space-y-4 cursor-pointer">
                <div
                  className="flex gap-x-2"
                  onClick={() => handleNetworkClicking(HEDGE_CHAIN)}
                >
                  <div className="mt-2 h-5 w-5">
                    <RightIcon
                      fill={
                        settingsState.networks.activeNet.chainID ===
                        HEDGE_CHAIN.chainID
                          ? 'green'
                          : 'white'
                      }
                    />
                  </div>
                  <Logo color="white" height="24" width="24" />
                  <p className="text-lg text-black-10 dark:text-white-75">
                    Hedge Mainnet
                  </p>
                  <img className="mt-2 h-4 w-4" src={Lock} />
                </div>
                {settingsState.networks.mainNets && (
                  <ListingAddedNets
                    activeNet={settingsState.networks.activeNet}
                    handleNetClick={handleNetworkClicking}
                    networks={settingsState.networks.mainNets}
                  />
                )}
                {settingsState.networks.testNets && (
                  <div className="space-y-4">
                    <p className="mt-5 text-base text-black-10 dark:text-white-65 font-semibold">
                      Test networks
                    </p>

                    <ListingAddedNets
                      activeNet={settingsState.networks.activeNet}
                      handleNetClick={handleNetworkClicking}
                      networks={settingsState.networks.testNets}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {/* overflow-hidden */}
          <div className="">
            {/* overflow-auto */}
            <div className="h-1/2">
              <div className="p-3 gap-5 space-y-3">
                {inputFieldsName.map((name: string, index: number) => (
                  <div key={index} className="flex flex-col">
                    <p className="text-sm text-black-10 dark:text-white-75 font-semibold">
                      {name}
                    </p>
                    <div className="h-10 w-96 border dark:border-white-25 border-black-10 rounded-md">
                      <input
                        className="text-base p-3 text-black-10 dark:text-white-75 h-10 w-full bg-transparent"
                        value={networkDetails[index]}
                        disabled={
                          networkDetails[0] === HEDGE_CHAIN.chainID
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-b dark:border-white-10 border-black-10 w-full"></div>
            <div className="flex mt-5 justify-between">
              <div className="bg-transparent border border-primary rounded-lg">
                <div className="px-10 py-2 text-primary text-base">Cancel</div>
              </div>
              <div className="bg-primary border border-primary rounded-lg opacity-30">
                <div className="px-12 py-2 text-base">Save</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Networks;
