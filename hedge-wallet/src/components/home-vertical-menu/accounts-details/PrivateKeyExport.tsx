import { FC, useState, useRef, useEffect, useCallback } from 'react';

import { Wrong, Back } from '@src/assets/img';
import Loader from '@src/components/loader';
import { PrivateKeyModalClose } from '@src/interfaces-and-types/components';
import { fetchAccountsState, homeSelectors } from '@src/pages/home/homeSlice';
import { onboardingSelectors } from '@src/pages/onboarding-flow/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { getPrivateKey, getShape } from '@src/services/utils';

const ExportPrivateKey: FC<PrivateKeyModalClose> = ({ closeModal, back }) => {
  const homeState = useAppSelector(homeSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);
  const appDispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [shape, setShape] = useState('');
  const [errMsg, setErrMsg] = useState(null);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
      closeModal(false);
    }
  };

  const handleOnKeyDownOrConfirm = async () => {
    onboardingState.password.password === password
      ? homeState.activeAccount.privateKeyOrPhrase
        ? (setPassword(homeState.activeAccount.privateKeyOrPhrase),
          setShowKey(true))
        : (setLoading(true),
          setPassword(
            await getPrivateKey(
              onboardingState.secretPhrase.phrase.masterKey,
              homeState.activeAccount.pathIndex
            )
          ),
          setShowKey(true),
          setLoading(false))
      : (setErrMsg('Invalid Password'), setShowKey(false));
  };

  const getHomeStateValues = useCallback(async () => {
    setErrMsg('');

    try {
      await appDispatch(fetchAccountsState()).unwrap();
    } catch (err) {
      null;
    }
  }, [password]);

  useEffect(() => {
    getHomeStateValues();
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [getHomeStateValues]);

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
          <div ref={modalRef} className="modal">
            <div className="flex justify-between items-center p-4">
              <div className="flex cursor-pointer" onClick={() => back(false)}>
                <img className="h-5 w-5" src={Back} />
                <p className="text-white-75 text-sm">back</p>
              </div>
              <div className="flex items-center space-y-6">
                <div className="flex md:px-10 px-8">
                  <img
                    className="h-12 w-12 bg-white rounded-full"
                    src={shape}
                  />
                </div>
              </div>
              <img
                className="h-6 w-6 mt-0 cursor-pointer"
                src={Wrong}
                onClick={() => {
                  setIsOpen(false);
                  closeModal(false);
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-center flex-1 md:space-y-4 space-y-3">
              <p className="text-white-75 text-2xl">
                {homeState.activeAccount.name}
              </p>
              <p className="btn btn-secondary flex justify-center items-center md:w-10/12 w-11/12 h-3 md:h-9 p-2">{`${homeState.activeAccount.publicKey.slice(
                0,
                30
              )}....`}</p>
              {showKey && (
                <p className="text-left md:text-lg text-base text-white-75">
                  {`${
                    !isCopied
                      ? `This is your private key (click to copy)`
                      : 'Copied ✅.'
                  }`}
                </p>
              )}
              {!showKey ? (
                <>
                  <p className="text-center text-lg text-white-75">
                    Show Private Key
                  </p>
                  <input
                    className="h-10 md:h-12 md:w-10/12 w-11/12 md:text-lg text-base text-center bg-transparent border border-solid border-white-35 rounded-md text-white-75"
                    placeholder="Enter your Hedge Hogg Password"
                    type={showPassword ? 'password' : 'text'}
                    value={password}
                    onMouseLeave={() => setShowPassword(true)}
                    onMouseEnter={() => setShowPassword(false)}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleOnKeyDownOrConfirm()
                    }
                  />
                  <p className="text-xs text-red-85 text-left">{errMsg}</p>
                </>
              ) : (
                <div
                  className={`flex justify-center items-center bg-transparent border border-white-85 rounded-md text-white-75 h-20 md:w-10/12 w-11/12 ${
                    password.length > 80 ? 'p-9' : 'p-6'
                  } cursor-pointer`}
                  onClick={() => (
                    navigator.clipboard.writeText(password),
                    setIsCopied(true),
                    setTimeout(() => setIsCopied(false), 1500)
                  )}
                >
                  <div className="details-address">
                    <div className="flex space-x-2">
                      <p className="text-red-85 md:text-base text-sm break-all">
                        {password}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center items-center bg-red-85 border-4 border-red rounded-md font-bold text-white-75 h-20 md:w-10/12 w-11/12 p-6">
                <div className="details-address">
                  <div className="flex space-x-2">
                    <p className="text-white text-sm">
                      Warning: Never disclose this key. Anyone with your private
                      keys can steal any assets held in your account.
                    </p>
                  </div>
                </div>
                <div className="h-4"></div>
              </div>
              <div className="card-footer cursor-pointer flex space-x-5 justify-end">
                {!showKey ? (
                  <>
                    <div
                      className="btn-secondary text-base w-auto space-x-3 py-1 px-3 rounded-lg right-0 hover:text-red text-white"
                      onClick={() => (setIsOpen(false), closeModal(false))}
                    >
                      Cancel
                    </div>
                    <div
                      className={`btn-primary text-base w-auto space-x-3 py-1 px-3 rounded-lg text-white ${
                        !password.length && 'opacity-60'
                      }`}
                      onClick={() => handleOnKeyDownOrConfirm()}
                    >
                      Confirm
                    </div>
                  </>
                ) : (
                  <div
                    className="btn-primary text-base w-auto space-x-3 md:py-2 md:px-5 py-1 px-4 rounded-lg text-white"
                    onClick={() => (setIsOpen(false), closeModal(false))}
                  >
                    Done
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportPrivateKey;
