import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_ROUTE } from '@src/helpers/constants/routes';
import { setInitialSettingsState } from '@src/pages/settings/settingsSlice';
import { useAppDispatch } from '@src/redux/store';

import '@styles/global.scss';

const OnboardingCompletion = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const getSettingsState = useCallback(async () => {
    try {
      await appDispatch(setInitialSettingsState()).unwrap();
    } catch (err) {
      null;
    }
  }, []);

  useEffect(() => {
    getSettingsState();
  }, [getSettingsState]);

  return (
    <div className="onboarding-container">
      <div className="card-container h-auto p-4">
        <div className="card-header">
          <div className="flex items-center text-3xl">🎉</div>
        </div>
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-header">Congratulations !</div>
          <p className="body-subheader text-sm text-center h-auto">
            Your wallet has been created successfully
          </p>
          <div className="body-content gap-2">
            <div className="info flex items-center gap-4 p-4 rounded-md">
              <div className="content h-6 w-6 text-lg">✓</div>
              <p className="content text-sm">
                You’ve successfully protected your wallet. Keep your Secret
                Recovery Phrase safe and secret- Its your responsibility.
              </p>
            </div>
            <div className="info flex flex-col p-4 rounded-md">
              <div className="info-header text-lg">Things to remember</div>
              <ol className="content text-sm list-decimal ps-6 py-2 leading-6">
                <li>HedgeHogg can’t recover your Secret Recovery Phrase</li>
                <li>
                  HedgeHogg will never ask you for your Secret Recovery Phrase
                </li>
                <li>
                  Never share your Secret Recovery Phrase with anyone or risk
                  your funds being stolen
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="card-footer end">
          <button
            className="btn-primary flex justify-center items-center  w-auto p-2 px-4 rounded-lg"
            onClick={() => {
              navigate(DEFAULT_ROUTE);
            }}
          >
            Open Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCompletion;
