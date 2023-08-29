import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HedgeHogg } from '@src/assets/img';
import { DEFAULT_ROUTE, ONBOARDING_ROUTE } from '@src/helpers/constants/routes';
import { Account } from '@src/interfaces-and-types/home-state';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import {
  fetchAccountsState,
  homeSelectors,
  insertNewAccount,
} from '@src/pages/home/homeSlice';
import '@styles/global.scss';
import { onboardingSelectors } from '@src/pages/onboarding-flow/onboardingSlice';
import {
  fetchSettingsState,
  settingsSelectors,
} from '@src/pages/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { getCoinBalance, getPublicAddress } from '@src/services/utils';

const CreateAccount = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const homeState = useAppSelector(homeSelectors);
  const settingsState = useAppSelector(settingsSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);

  const getAccountState = useCallback(async () => {
    if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED) {
      navigate(ONBOARDING_ROUTE);

      return;
    }
    await appDispatch(fetchAccountsState()).unwrap();
    await appDispatch(fetchSettingsState()).unwrap();
    setLoading(false);
  }, [appDispatch]);

  useEffect(() => {
    getAccountState();
  }, [getAccountState]);

  useEffect(() => {
    if (
      name.length > 2 &&
      homeState.accounts.find((acc) => acc.name === name)
    ) {
      setErrorMsg('Account name already taken.');
    } else {
      setErrorMsg('');
    }
  }, [name]);

  const newAccount = async () => {
    setLoading(true);

    const publicKey = await getPublicAddress(
      onboardingState.secretPhrase.phrase.masterKey,
      homeState.accIndex,
      settingsState.networks.activeNet.addressPrefix
    );

    const newAcc: Account = {
      name: name,
      publicKey,
      balance: {
        ...(await getCoinBalance(
          settingsState.networks.activeNet.name,
          publicKey
        )),
      },
      connectedSites: [],
      pathIndex: homeState.accIndex,
    };
    await appDispatch(insertNewAccount(newAcc));
    setLoading(false);
    navigate(DEFAULT_ROUTE);
  };

  const handleOnKeyDownOrCreate = () => {
    !name
      ? setErrorMsg('Enter the Account name')
      : !errorMsg && name.length > 3 && newAccount();
  };

  return loading ? (
    <div className="flex w-full h-full items-center justify-center motion-safe:animate-ping">
      <img className="h-8 w-8" src={HedgeHogg} />
    </div>
  ) : (
    <div className="onboarding-container">
      <div className="card-container h-auto p-4">
        <div className="card-header"></div>
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-content gap-2">
            <div className="info flex flex-col p-4 rounded-md">
              <div className="body-header" style={{ fontWeight: 'bold' }}>
                Create Account
              </div>
              <div className="info-header text-lg"></div>
              <ol className="content text-sm list-decimal ps-6 py-2 leading-6">
                <div className="body-content items-center gap-4">
                  <div className="password-container flex flex-col h-auto gap-2">
                    <br></br>
                    <div
                      className="placeholder text-sm"
                      style={errorMsg ? { color: 'red' } : {}}
                    >
                      {!errorMsg ? 'Account name' : errorMsg}
                    </div>
                    <div className="input-container">
                      <input
                        className="password-input h-full w-10/12 text-lg p-2"
                        placeholder={`Account ${homeState.accounts.length + 1}`}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && handleOnKeyDownOrCreate()
                        }
                      />
                      <div
                        className="input-validation text-xs"
                        style={
                          !errorMsg && name.length > 3
                            ? { color: 'greenyellow' }
                            : {}
                        }
                      >
                        <br></br>
                        {!errorMsg && name.length > 3
                          ? '✅ Account name available'
                          : 'At least 4 characters'}
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="card-footer end cursor-pointer">
                  <div
                    className="btn-secondary flex justify-center items-center w-auto p-2 px-4 rounded-lg"
                    onClick={() => {
                      navigate(DEFAULT_ROUTE);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className="btn-primary flex justify-center items-center  w-auto p-2.5 px-4 rounded-lg"
                    onClick={() => handleOnKeyDownOrCreate()}
                  >
                    Create
                  </div>
                </div>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
