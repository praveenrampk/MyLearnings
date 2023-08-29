import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RightArrow } from '@src/assets/img';
import Loader from '@src/components/loader';
import { checkChainExistInWallet } from '@src/helpers';
import {
  ADD_NETWORKS_MANUALLY,
  NETWORK_ROUTE,
} from '@src/helpers/constants/routes';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { ADDED_NETWORKS } from '@src/services/constants';
import { getNetworkData } from '@src/services/networks';

import { fetchSettingsState, settingsSelectors } from '../../settingsSlice';
import ApproveNetwork from '../approve-network';

const AddNetworks = () => {
  const navigate = useNavigate();
  const settingsState = useAppSelector(settingsSelectors);
  const appDispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [networkElements, setNetworkElements] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState([]);
  const [addNetwork, setAddNetwork] = useState(false);

  const fetchNetworks = useCallback(async () => {
    setLoading(true);
    await appDispatch(fetchSettingsState()).unwrap();

    const remainingChains = settingsState.networks.mainNets
      ? checkChainExistInWallet(settingsState.networks.mainNets)
      : ADDED_NETWORKS;

    const networkElements = await Promise.all(
      remainingChains.map(async (chainID, index) => {
        const response = await getNetworkData(chainID);

        return loading ? (
          <Loader />
        ) : (
          <div
            key={index}
            className="flex flex-col p-2 hover:bg-white-15 rounded-md cursor-pointer"
            onClick={() => (setSelectedNetwork(response), setAddNetwork(true))}
          >
            <div className="flex justify-between">
              <div className="flex gap-x-3">
                <img
                  className="h-7 w-7"
                  src={
                    response?.chain?.logo_URIs?.png || response?.chain?.image
                  }
                  alt={response.chain?.chain_name}
                />
                <p className="mt-1 text-sm text-black-10 dark:text-white-75 font-bold">
                  {response.chain?.pretty_name}
                </p>
              </div>
              <div className="text-sm text-primary cursor-pointer">
                Click to Add
              </div>
            </div>
            {/* <div className="p-1 border-b border-white-10 w-full"></div> */}
          </div>
        );
      })
    );
    setLoading(false);
    setNetworkElements(networkElements);
  }, []);

  useEffect(() => {
    fetchNetworks();
  }, [fetchNetworks]);

  return loading ? (
    <Loader />
  ) : (
    <div className="p-2 mt-5 h-full w-full">
      <div className="flex flex-row gap-x-2">
        <div
          className="text-lg text-black-10 dark:text-white-35 hover text-black-10:dark:text-white-75 cursor-pointer"
          onClick={() => navigate(NETWORK_ROUTE)}
        >
          Networks
        </div>
        <img className="mt-1.5 h-4 w-4" src={RightArrow} alt="Right Arrow" />
        <div className="text-lg dark:text-white-75 text-black-10">
          Add a Network
        </div>
      </div>
      <div className="border-b border-solid border-white-10 my-2"></div>
      <div className="space-y-4">
        <p className="text-sm text-black-10 dark:text-white-75">
          Add from a list of popular networks or add a network manually. Only
          interact with the entities you trust.
        </p>
        <div className="flex flex-col gap-y-2">
          <div className="mt-5 flex flex-row justify-between">
            <p className="text-sm text-black-10 dark:text-white-35">
              Popular custom networks
            </p>
            <div
              className="underline font-semibold text-base text-primary cursor-pointer"
              onClick={() => navigate(ADD_NETWORKS_MANUALLY)}
            >
              Add a network manually
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-col h-96 overflow-auto">
              {networkElements}
            </div>
          </div>
        </div>
      </div>
      {addNetwork && (
        <ApproveNetwork
          closeModal={setAddNetwork}
          networkData={JSON.stringify(selectedNetwork)}
        />
      )}
    </div>
  );
};

export default AddNetworks;
