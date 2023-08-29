import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Hide, HedgeHogg, View } from '@src/assets/img';
import Loader from '@src/components/loader';
import {
  DEFAULT_ROUTE,
  ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
} from '@src/helpers/constants/routes';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import {
  fetchAccountsState,
  homeSelectors,
  unlockWallet,
} from '../home/homeSlice';
import { onboardingSelectors } from '../onboarding-flow/onboardingSlice';

import '@styles/global.scss';

const Lock = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [viewkey, setViewKey] = useState<boolean>(true);
  const [password, setPassword] = useState<string | null>('');
  const [inputErrMsg, setInputErrMsg] = useState<string>('');
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const onboardingState = useAppSelector(onboardingSelectors);
  const homeState = useAppSelector(homeSelectors);

  const isLoggedIn = useCallback(async () => {
    await appDispatch(fetchAccountsState()).unwrap();
    setLoading(false);
    if (homeState && homeState.accounts && homeState.isLogedIn)
      navigate(DEFAULT_ROUTE);
  }, [appDispatch]);

  useEffect(() => {
    isLoggedIn();
    setInputErrMsg(null);
  }, [isLoggedIn, password]);

  const validatePassword = async () => {
    if (password === onboardingState.password.password) {
      await appDispatch(unlockWallet()).unwrap();

      navigate(
        onboardingState.onboardingStatus === OnboardingStatus.COMPLETED
          ? DEFAULT_ROUTE
          : ONBOARDING_SECURE_YOUR_WALLET_ROUTE
      );
    } else {
      setInputErrMsg('Wrong password');
    }
  };

  return (
    <div className="onboarding-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="card-container p-4">
          <div className="card-header">
            <img className="h-8 w-8" src={HedgeHogg} />
            <div className="flex items-center text-xl">HedgeHogg</div>
          </div>
          <div className="card-body h-auto p-4 space-y-4">
            <div className="body-header">Welcome back!</div>
            <p className="body-subheader">
              Trusted by many people, HedgeHogg is a secure wallet making the
              world of web3 accessible to all.
            </p>
            <div className="body-content items-center gap-4">
              <div className="password-container flex flex-col h-auto gap-2">
                <div className="secret-phrase-confirm flex flex-col items-center justify-start p-4">
                  <div className="password-container flex flex-col h-auto gap-2">
                    <div
                      className="placeholder text-sm"
                      style={inputErrMsg ? { color: 'red' } : {}}
                    >
                      {!inputErrMsg ? 'Password' : inputErrMsg}
                    </div>
                    <div
                      className="input-container"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <input
                        className="password-input h-full w-10/12 text-lg p-2"
                        placeholder="Spider$05"
                        style={{
                          marginRight: '10px',
                        }}
                        type={viewkey ? 'password' : 'text'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && password && validatePassword()
                        }
                      />
                      <div className="input-validation text-xs flex items-center justify-center w-1/6">
                        <img
                          className="cursor-pointer"
                          src={viewkey ? Hide : View}
                          onClick={() => setViewKey(!viewkey)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer col p-4">
              <div
                className="btn btn-primary flex justify-center items-center"
                onClick={() => password && validatePassword()}
              >
                Unlock
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lock;
