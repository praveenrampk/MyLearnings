import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Back, Logo, Tokens } from '@src/assets/img';
import TransactionDetails from '@src/components/transaction-details';
import { DEFAULT_ROUTE } from '@src/helpers/constants/routes';
import { TxDetails } from '@src/interfaces-and-types/home-state';
import { fetchAccountsState, homeSelectors } from '@src/pages/home/homeSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { truncateWordAtIndex } from '@src/services/utils';

const AssetBasedTransaction = () => {
  const homeState = useAppSelector(homeSelectors);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [txDetails, setTxDetails] = useState<TxDetails | null>(null);

  const getAccountState = useCallback(async () => {
    try {
      if (homeState.activeAccount) {
        setLoading(true);
        await appDispatch(fetchAccountsState()).unwrap();
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (err) {
      setLoading(true);
    }
  }, [homeState, appDispatch]);

  useEffect(() => {
    getAccountState();
  }, [getAccountState]);

  return loading ? (
    <div className="flex w-full h-full items-center justify-center motion-safe:animate-ping">
      <Logo color="white" height="32" width="32" />
    </div>
  ) : (
    <div className="send-container">
      <div className="send-body">
        <div className="send-inner-container">
          <div className="card">
            <div className="send-header">
              <div
                className="flex gap-1 cursor-pointer items-center justify-start h-12 text-lg text-white-85 hover:bg-white-15 rounded-sm"
                onClick={() => navigate(DEFAULT_ROUTE)}
              >
                <img className="h-5 w-5 top-1" src={Back} />
                <p className="text-white-75 text-base">{`${homeState.activeAccount.name} / Hedge`}</p>
              </div>
              <div className="mt-5 p-6 bg-primary rounded-md">
                <div className="flex flex-col">
                  <div className="relative bottom-3 text-black text-sm justify-start">
                    My balance
                  </div>
                  <div className="relative bottom-2 text-black text-lg justify-start font-bold">
                    {homeState.activeAccount.balance.bal} HEDGE
                  </div>
                  <div className="relative bottom-1 text-black text-lg justify-start font-bold">
                    {homeState.activeAccount.balance.stake} STAKE
                  </div>
                  <div className="flex gap-1 w-fit p-2 bg-white relative bottom-0 text-black text-sm justify-start rounded-md">
                    <span className="font-semibold">$</span>{' '}
                    {1810.28 * Number(homeState.activeAccount.balance.bal)} USD
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 divide-y divide-white-15">
                <div className="mt-4"></div>
                <div></div>
              </div>
              <div className="mt-2 text-lg text-white-75">Transactions</div>
              <div className="overflow-auto max-h-72">
                {homeState.activeAccount.txHistory ? (
                  homeState.activeAccount.txHistory.map((transactions) => (
                    <>
                      <div
                        className="px-2 grid grid-cols-1 cursor-pointer items-center justify-start h-12 hover:bg-white-15 rounded-sm hover:scale-105"
                        onClick={() => setTxDetails(transactions)}
                      >
                        <div className="flex gap-3 h-10 w-full hover:px-2">
                          <div className="h-10 w-10 rounded-full items-center justify-center bg-pink-300">
                            <div className="mt-3 ml-3.5">
                              <Tokens name={transactions.type} />
                            </div>
                          </div>
                          <div className="flex flex-col divide-y-0 divide-white-10">
                            <div className="flex">
                              <p className="text-white-75 text-base justify-start">
                                {truncateWordAtIndex(transactions.txHash, 5)}
                              </p>
                              <p className="text-white-75 text-sm justify-end">
                                -{transactions.amount} Hedge
                              </p>
                            </div>
                            <div className="flex">
                              <div className="text-white-45 text-sm justify-start">
                                {new Date(
                                  transactions.timestamp
                                ).toDateString()}
                              </div>
                              <div className="text-red text-xs justify-end">
                                $122.321 USD
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <div className="text-white-75 md:text-lg text-base mt-4 md:ml-32 ml-16">
                    You have no transactions
                  </div>
                )}
                {txDetails && (
                  <TransactionDetails
                    txDetails={txDetails}
                    closeTxModal={setTxDetails}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetBasedTransaction;
