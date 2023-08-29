import { FC, useState, useRef, useEffect, useCallback } from 'react';

import { Copied, Copy, Wrong } from '@src/assets/img';
import { TxModalProps } from '@src/interfaces-and-types/components';
import { fetchAccountsState, homeSelectors } from '@src/pages/home/homeSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import {
  getShape,
  getTransactionDetails,
  truncateWordAtIndex,
} from '@src/services/utils';

import Loader from '../loader';

const TransactionDetails: FC<TxModalProps> = ({ txDetails, closeTxModal }) => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [shape, setShape] = useState('');
  const [copy, setCopy] = useState(false);
  const [txData, setTxData] = useState(null);
  const [noData, setNoData] = useState<null | string>(null);
  const modalRef = useRef(null);

  const homeState = useAppSelector(homeSelectors);
  const appDispatch = useAppDispatch();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
      closeTxModal(null);
    }
  };

  const getTxData = useCallback(async () => {
    try {
      const response = await getTransactionDetails(txDetails.txHash);
      setTxData(response);
      setLoading(false);
    } catch (err) {
      setNoData('This Transaction Hash was Expired !.');
      setLoading(false);
    }
  }, [txDetails.txHash]);

  const getHomeStateValues = useCallback(async () => {
    try {
      await appDispatch(fetchAccountsState()).unwrap();
    } catch (err) {
      null;
    }
  }, [appDispatch]);

  useEffect(() => {
    getTxData();
    getHomeStateValues();
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [getHomeStateValues, getTxData]);

  useEffect(() => {
    if (homeState.activeAccount) {
      setShape(getShape(homeState.activeAccount.publicKey));
    }
  }, [homeState]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="modal p-4">
            {!noData ? (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-white-75 md:text-2xl text-lg font-bold">
                    Send
                  </p>
                  <img
                    className="h-6 w-6 mt-0 cursor-pointer"
                    src={Wrong}
                    onClick={() => {
                      setIsOpen(false);
                      closeTxModal(null);
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex space-y-6">
                    <p className="text-white-75 md:text-base text-lg font-bold">
                      Status
                    </p>
                    <a className="text-white-75 md:text-base text-lg underline">
                      View on Hedge Scan
                    </a>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-y-6">
                    <p className="text-green md:text-base text-lg font-bold">
                      Confirmed
                    </p>
                    <div
                      className="flex space-x-2 cursor-pointer"
                      onClick={() => (
                        navigator.clipboard.writeText(txDetails.txHash),
                        setCopy(true),
                        setTimeout(() => setCopy(false), 1000)
                      )}
                    >
                      <p className="text-white-75 md:text-base text-sm">
                        {truncateWordAtIndex(txDetails.txHash, 7)}
                      </p>
                      <img
                        className={`h-4 w-4 ${copy && 'bg-green rounded-xl'}`}
                        src={copy ? Copied : Copy}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-col">
                  <div className="flex space-y-6">
                    <p className="text-white-75 md:text-base text-lg font-bold">
                      From
                    </p>
                    <p className="text-white-75 md:text-sm text-xs">
                      {txData.tx.body.messages[0].from_address}
                    </p>
                  </div>
                </div>
                <div className="flex-col">
                  <div className="flex space-y-6">
                    <p className="text-white-75 md:text-base font-bold text-lg">
                      To
                    </p>
                    <p className="text-white-75 md:text-sm text-xs space-x-10">
                      {txData.tx.body.messages[0].to_address}
                    </p>
                  </div>
                </div>
                <div className="flex-col justify-between -bottom-7">
                  <div className="flex space-y-6">
                    <p className="text-white-75 md:text-base font-bold text-lg">
                      Transaction
                    </p>
                  </div>
                  <div className="md:space-y-4 space-y-2">
                    <div className="text-white-75 md:text-base font-bold text-lg">
                      Amount
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white-75 md:text-base text-lg">
                        Gas limit :
                      </p>
                      <p className="text-white-75 md:text-base text-lg">
                        {txData.tx.auth_info.fee.gas_limit / 1000000}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white-75 md:text-base text-lg">
                        Gas used :
                      </p>
                      <p className="text-white-75 md:text-base text-lg">
                        {txData.tx_response.gas_used / 1000000}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white-75 md:text-base text-lg">
                        coin_spent :
                      </p>
                      <p className="text-white-75 md:text-base text-lg">
                        {txData.tx.body.messages[0].amount[0].amount / 1000000}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white-75 md:text-base text-lg">
                        Total :
                      </p>
                      <p className="text-white-75 md:text-base text-lg">
                        {txData.tx.body.messages[0].amount[0].amount / 1000000 +
                          txData.tx_response.gas_used / 1000000}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-white-75 md:text-lg text-base mt-4 md:ml-10 ml-16">
                {noData}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
