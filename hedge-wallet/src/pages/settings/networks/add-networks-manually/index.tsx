import { useCallback, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { RightArrow } from '@src/assets/img';
import CautionIcon from '@src/components/icons/caution';
import Loader from '@src/components/loader';
import { validateChainBeforeManualAdd } from '@src/helpers';
import {
  ADD_NETWORKS,
  DEFAULT_ROUTE,
  NETWORK_ROUTE,
} from '@src/helpers/constants/routes';
import {
  mainNetInputPlaceholders,
  testNetInputPlaceholders,
} from '@src/helpers/misc';
import { NetworksStatus } from '@src/interfaces-and-types/settings-state';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { getMainNetDetails, getTestNetDetails } from '@src/services/networks';

import {
  addMainNetOrTestNet,
  fetchSettingsState,
  settingsSelectors,
} from '../../settingsSlice';

const AddNetworksManually = () => {
  const settingsState = useAppSelector(settingsSelectors);
  const appDispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [chosenNet, chooseNet] = useState(true);

  const [errorMessages, setErrorMessages] = useState<string[] | null[]>(
    Array.from({ length: 9 }, () => null)
  );

  const [inputValues, setInputValues] = useState(
    Array.from({ length: 9 }, () => '')
  );
  const navigate = useNavigate();

  const fetchNetworkDetails = useCallback(
    async (chainName: string, networkCallback: (chainName: string) => any) => {
      try {
        setErrorMessages(Array.from({ length: 9 }, () => null));

        const response = await networkCallback(chainName);
        const newInputs = [...inputValues];
        newInputs[0] = response.chain.chain_name;
        newInputs[1] = response.chain.chain_id;
        newInputs[2] = response.chain.best_apis.rpc[0].address;
        newInputs[3] = response.chain.best_apis.rest[0].address;
        newInputs[4] = response.chain.bech32_prefix;
        newInputs[5] = response.chain.denom;
        newInputs[6] = response.chain.slip44;
        newInputs[7] = response.chain.decimals;
        newInputs[8] = response.chain.explorers[0].url;

        setInputValues([...newInputs]);
      } catch (err) {
        if (chainName.length) {
          const newErrorMessages = [...errorMessages];
          newErrorMessages[0] = 'Invalid Chain';
          setErrorMessages([...newErrorMessages]);
        }
      }
    },
    []
  );

  const inputChanged = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...inputValues];
    newInputs[index] = e.target.value;
    setInputValues([...newInputs]);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      const networks = chosenNet
        ? settingsState.networks.mainNets
        : settingsState.networks.testNets;

      if (networks && validateChainBeforeManualAdd(newInputs[0], networks)) {
        const newErrors = Array(9).fill(null);
        const inputs = Array(9).fill('');
        newErrors[0] = 'Chain Already Exist';
        inputs[0] = newInputs[0];

        setErrorMessages(newErrors);
        setInputValues([...inputs]);
      } else {
        fetchNetworkDetails(
          newInputs[0].toLowerCase(),
          chosenNet ? getMainNetDetails : getTestNetDetails
        );
      }
    }, 1000);

    setTimer(newTimer);
  };

  const manualAddNetwork = async () => {
    if (
      errorMessages.find((err) => err !== null) === undefined &&
      inputValues[0].length > 2
    ) {
      setLoading(true);
      await appDispatch(fetchSettingsState()).unwrap();

      const response = await (chosenNet
        ? getMainNetDetails
        : getTestNetDetails)(inputValues[0]);

      await appDispatch(
        addMainNetOrTestNet({
          network: {
            name: response.chain?.chain_name,
            prettyName: response.chain?.pretty_name,
            rpc: response.chain?.best_apis?.rpc[0]?.address,
            rest: response.chain?.best_apis?.rest[0]?.address,
            chainID: response.chain?.chain_id,
            addressPrefix: response.chain?.bech32_prefix,
            nativeDenom: response.chain?.denom,
            coinType: response.chain?.slip44,
            decimals: response.chain?.decimals,
            blockExplorerURL: response.chain?.explorers[0]?.url,
            imageURL: response.chain?.logo_URIs?.png || response.chain?.image,
            symbol: response.chain?.symbol,
            isUsed: false,
          },
          status: chosenNet
            ? NetworksStatus.MAIN_NETS
            : NetworksStatus.TEST_NETS,
        })
      );
      setLoading(false);
      navigate(DEFAULT_ROUTE);
    } else {
      const newErrors = [...errorMessages];
      newErrors[0] = 'Enter a valid Details';
      setErrorMessages([...newErrors]);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-2 mt-5 h-full w-full">
      <div className="flex flex-row gap-x-2">
        <div
          className="text-lg text-black-10 hover:text-gray-800 dark:text-white-35 dark:hover:text-white-75 cursor-pointer"
          onClick={() => navigate(NETWORK_ROUTE)}
        >
          Networks
        </div>
        <img
          className="mt-1.5 h-4 w-4 opacity-40"
          src={RightArrow}
          alt="Right Arrow"
        />
        <div
          className="text-lg text-black-10 hover:text-gray-800 dark:text-white-35 dark:hover:text-white-75 cursor-pointer"
          onClick={() => navigate(ADD_NETWORKS)}
        >
          Add a Network
        </div>
        <img className="mt-1.5 h-4 w-4" src={RightArrow} alt="Right Arrow" />
        <div className="text-lg text-black-10 dark:text-white-75">
          Add a network manually
        </div>
      </div>
      <div className="border-b border-solid text-black-10 dark:border-white-10 my-2"></div>
      <div className="flex p-2 gap-x-3 w-full">
        <div className="mt-1.5">
          <CautionIcon fill="rgba(255, 198, 77, 1)" />
        </div>
        <div className="flex flex-row w-3/4 justify-between">
          <div className="flex flex-col">
            <p className="text-base text-black-10 dark:text-white-35 font-semibold">
              Caution:
            </p>
            <p className="text-sm text-black-10 dark:text-white-75">
              Only add custom networks you trust.
            </p>
          </div>
          <div className="flex flex-row gap-x-3">
            <p className="py-2 text-base text-black-10 dark:text-white-75">
              Click to:{' '}
            </p>
            <div
              className="px-6 py-2 bg-transparent border-2 border-primary rounded-full cursor-pointer"
              onClick={() => (
                chooseNet(!chosenNet),
                setInputValues(Array.from({ length: 9 }, () => '')),
                setErrorMessages(Array.from({ length: 9 }, () => null))
              )}
            >
              <p className="text-base text-primary">
                {chosenNet ? 'Add TestNet' : 'Add MainNet'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="mt-4 gap-5 space-y-3 h-80 overflow-auto">
          {(chosenNet
            ? mainNetInputPlaceholders
            : testNetInputPlaceholders
          ).map((name: string, index: number) => (
            <div key={index} className="flex flex-col">
              <p className="text-sm text-red-85">{errorMessages[index]}</p>
              <div className="h-12 w-3/4 border border-white-25 rounded-md">
                <input
                  className="text-base p-3 text-white-75 h-10 w-full bg-transparent"
                  placeholder={name}
                  value={inputValues[index]}
                  onChange={(e) => inputChanged(e, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 border-b border-black-10 dark:border-white-15 w-3/4"></div>
      <div className="items-center justify-center w-3/4">
        <div className="flex mt-3 justify-between w-full">
          <div
            className="bg-transparent border border-primary rounded-lg cursor-pointer"
            onClick={() => navigate(NETWORK_ROUTE)}
          >
            <div className="px-11 py-2 text-primary text-base">Cancel</div>
          </div>
          <div
            className="bg-primary border border-primary rounded-lg cursor-pointer"
            onClick={() => manualAddNetwork()}
          >
            <div className="px-14 py-2 text-base ">Add</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNetworksManually;
