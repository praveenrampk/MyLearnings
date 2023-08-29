import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Back } from '@src/assets/img';
import { ADD_NETWORKS, DEFAULT_ROUTE } from '@src/helpers/constants/routes';
import {
  ApproveNetworkCloseProps,
  NetworkListSubComponentProps,
} from '@src/interfaces-and-types/components';
import { NetworksStatus } from '@src/interfaces-and-types/settings-state';
import { useAppDispatch } from '@src/redux/store';

import { addMainNetOrTestNet, fetchSettingsState } from '../../settingsSlice';

const ApproveNetwork: FC<ApproveNetworkCloseProps> = ({
  closeModal,
  networkData,
}) => {
  const network = JSON.parse(networkData);

  const [isDetailsViewed, setIsDetailsViewed] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const appDispatch = useAppDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsDetailsViewed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    };
  }, []);

  const CommonDetailsOfNetwork: FC<NetworkListSubComponentProps> = ({
    fullyViewed,
  }) => {
    return (
      <div className="p-5 max-h-[300px]">
        <div
          className={`h-full w-full p-3 space-y-3 overflow-scroll ${
            !fullyViewed && 'border border-solid border-white-15 rounded-lg'
          }`}
        >
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">
              Network name
            </p>
            <p className="text-white-65 text-sm">
              {network.chain?.pretty_name}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">{`Network URL (RPC)`}</p>
            <p className="text-white-65 text-sm">
              {network.chain?.best_apis?.rpc[0]?.address}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">{`Network URL (REST)`}</p>
            <p className="text-white-65 text-sm">
              {network.chain?.best_apis?.rest[0]?.address}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">Chain ID</p>
            <p className="text-white-65 text-sm">{network.chain?.chain_id}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">
              Currency Symbol
            </p>
            <p className="text-white-65 text-sm">
              {network.chain?.bech32_prefix}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">
              Native Denom
            </p>
            <p className="text-white-65 text-sm">{network.chain?.denom}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">Coin Type</p>
            <p className="text-white-65 text-sm">{network.chain?.slip44}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">Decimals</p>
            <p className="text-white-65 text-sm">{network.chain?.decimals}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-base text-white-75 font-semibold">
              {`Block explorer URL (Optional)`}
            </p>
            <p className="text-white-65 text-sm">
              {network.chain?.explorers[0].url}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="networkModal">
        <div className="-mt-9 flex justify-center items-center px-8 py-4">
          <div className="p-4 h-10 bg-black border border-solid border-white-65 rounded-3xl">
            <div className="flex flex-row -mt-3.5 items-center justify-center gap-x-4">
              <img
                className="h-8 w-8 border-white-75 rounded-full"
                src={network?.chain?.logo_URIs?.png || network?.chain?.image}
              />
              <p className="text-lg text-white-85 font-bold">
                {network?.chain?.pretty_name}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-center items-center gap-y-1">
          <p className="text-center text-2xl text-white-85 font-bold">
            Want to add this network?
          </p>
          <p className="text-sm text-white-65">
            This will allow this network to be used within Hedge Hogg.
          </p>
          <p className="text-sm text-white-65 font-bold">
            Hedge Hogg does not verify custom networks.
          </p>
          <div className="flex flex-row gap-x-1">
            <p className="text-sm text-white-65">Learn about</p>
            <a
              href={`/src/popup.html#${ADD_NETWORKS}`}
              className="text-sm text-primary"
            >
              scams and network security risks.
            </a>
          </div>
        </div>
        {!isDetailsViewed && <CommonDetailsOfNetwork fullyViewed={false} />}
        <div className="border-b border-white-10 w-full"></div>
        <div className="flex mt-4 justify-evenly w-full">
          <div className="bg-transparent border border-primary rounded-xl cursor-pointer">
            <div
              className="px-9 py-1.5 text-primary text-base"
              onClick={() => closeModal(false)}
            >
              Cancel
            </div>
          </div>
          <div
            className="bg-primary border border-primary rounded-xl cursor-pointer"
            onClick={async () => {
              await appDispatch(fetchSettingsState()).unwrap();

              await appDispatch(
                addMainNetOrTestNet({
                  network: {
                    name: network.chain?.chain_name,
                    prettyName: network.chain?.pretty_name,
                    rpc: network.chain?.best_apis?.rpc[0]?.address,
                    rest: network.chain?.best_apis?.rest[0]?.address,
                    chainID: network.chain?.chain_id,
                    addressPrefix: network.chain?.bech32_prefix,
                    nativeDenom: network.chain?.denom,
                    coinType: network.chain?.slip44,
                    decimals: network.chain?.decimals,
                    blockExplorerURL: network.chain?.explorers[0]?.url,
                    imageURL:
                      network.chain?.logo_URIs?.png || network.chain?.image,
                    symbol: network.chain?.symbol,
                    isUsed: false,
                  },
                  status: NetworksStatus.MAIN_NETS,
                })
              ).unwrap();
              closeModal(false);
              navigate(DEFAULT_ROUTE);
            }}
          >
            <div className="px-7 py-1.5 text-base ">Approve</div>
          </div>
        </div>
      </div>
      {isDetailsViewed && (
        <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="networkModal">
            <div
              className="flex flex-col py-3 border-b border-white-15 hover:bg-white-10 cursor-pointer"
              onClick={() => {
                setIsDetailsViewed(false);
              }}
            >
              <div className="flex flex-row px-6 gap-x-3">
                <img
                  className="mt-1.5 h-5 w-5 hover:opacity-50 cursor-pointer"
                  src={Back}
                />
                <div className="text-lg text-white-85 font-bold">
                  Network details
                </div>
              </div>
            </div>
            <CommonDetailsOfNetwork fullyViewed={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveNetwork;
