import { FC } from 'react';

import { ListingNetworksProps } from '@src/interfaces-and-types/components';
import { NetworksProps } from '@src/interfaces-and-types/onboarding-flow';

import RightIcon from '../icons/rightIcon';

const ListingAddedNets: FC<ListingNetworksProps> = ({
  handleNetClick,
  networks,
  activeNet,
}) => {
  return (
    <div className="flex flex-col space-y-4 cursor-pointer">
      {networks.map((network: NetworksProps, index: number) => (
        <div
          key={index}
          className="flex gap-x-2"
          onClick={() => handleNetClick(network)}
        >
          <div className="mt-2 h-5 w-5">
            <RightIcon
              fill={activeNet.chainID === network.chainID ? 'green' : 'white'}
            />
          </div>
          <img className="mt-1 h-6 w-6" src={network.imageURL} />
          <p className="text-lg text-black-10 dark:text-white-75">
            {network.prettyName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListingAddedNets;
