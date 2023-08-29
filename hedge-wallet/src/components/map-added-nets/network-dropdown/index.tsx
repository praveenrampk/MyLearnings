import { FC, useEffect, useRef } from 'react';

import Delete from '@src/components/icons/delete';
import { ListingNetsOnDropdownProps } from '@src/interfaces-and-types/components';
import { NetworksProps } from '@src/interfaces-and-types/onboarding-flow';

const ListingNetsOnDropdown: FC<ListingNetsOnDropdownProps> = ({
  activeNet,
  pickNetwork,
  networks,
  deleteNetwork,
  toggleDeleteNet,
  toggleNetwork,
  status,
}) => {
  const activeNetRef = useRef<HTMLDivElement>(null);
  const inActiveNetRef = useRef<HTMLDivElement>(null);

  const scrollToActiveNetwork = () => {
    activeNetRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setTimeout(() => scrollToActiveNetwork(), 300);
  }, []);

  return (
    <>
      {networks.map((network: NetworksProps, index: number) => (
        <div
          ref={
            network.chainID === activeNet.chainID
              ? activeNetRef
              : inActiveNetRef
          }
          key={index}
          className={`flex justify-between p-2 ${
            network.chainID === activeNet.chainID
              ? 'dark:bg-white-15 bg-gray-600'
              : 'hover:bg-white-5'
          } gap-x-2 rounded-md cursor-pointer hide-delete-icon`}
        >
          <div className="flex gap-x-2" onClick={() => pickNetwork(network)}>
            {network.chainID === activeNet.chainID ? (
              <div className="h-full w-1 mt-0.5 bg-primary rounded-md"></div>
            ) : (
              <div className="px-1"></div>
            )}
            <img className="mt-1 h-8 w-8" src={network.imageURL} />
            <p className="mt-1 text-xl text-black-10 dark:text-white-75">
              {network.prettyName}
            </p>
          </div>
          {network.chainID !== activeNet.chainID && (
            <div
              className="hover:opacity-40 p-3"
              onClick={() => {
                toggleNetwork(false);
                toggleDeleteNet(true);
                deleteNetwork({ network, status });
              }}
            >
              <div className="opacity-5">
                <Delete color="red" />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ListingNetsOnDropdown;
