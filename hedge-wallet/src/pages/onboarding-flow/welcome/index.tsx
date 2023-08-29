import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { HedgeHogg } from '@src/assets/img';
import {
  DEFAULT_ROUTE,
  ONBOARDING_CREATE_PASSWORD_ROUTE,
  ONBOARDING_IMPORT_WITH_SRP_ROUTE,
  ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
} from '@src/helpers/constants/routes';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import {
  fetchOnboardingState,
  onboardingSelectors,
  updateOnboardingStatus,
} from '../onboardingSlice';

import '@styles/global.scss';

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const onboardingState = useAppSelector(onboardingSelectors);

  const navigateTo = (route: string) => {
    const isPopupOpen = chrome.extension.getViews({ type: 'popup' }).length > 0;

    if (isPopupOpen) {
      window.open(
        `chrome-extension://${chrome.runtime.id}/src/popup.html#${route}`,
        '_blank'
      );
    } else navigate(route);
  };

  const checkOnboarding = useCallback(async () => {
    await appDispatch(fetchOnboardingState()).unwrap();

    switch (onboardingState.onboardingStatus) {
      case OnboardingStatus.INITIALIZED:
        navigateTo(ONBOARDING_CREATE_PASSWORD_ROUTE);
        break;
      case OnboardingStatus.CREATE_PASSWORD:
        navigateTo(ONBOARDING_SECURE_YOUR_WALLET_ROUTE);
        break;
      case OnboardingStatus.CREATE_PASSWORD_FOR_IMPORT:
        navigateTo(ONBOARDING_IMPORT_WITH_SRP_ROUTE);
        break;
      case OnboardingStatus.SRP_CREATED:
        navigateTo(ONBOARDING_SECURE_YOUR_WALLET_ROUTE);
        break;
      case OnboardingStatus.COMPLETED:
        navigate(DEFAULT_ROUTE);
        break;
      default:
        break;
    }
  }, [appDispatch, onboardingState]);

  useEffect(() => {
    checkOnboarding();
  }, [checkOnboarding]);

  return (
    <div className="onboarding-container">
      <div className="card-container p-4">
        <div className="card-header">
          <img className="h-10 w-10" src={HedgeHogg} />
          <div className="flex items-center text-xl">Hedge Hogg</div>
        </div>
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-header">Welcome to Hedge Hogg wallet</div>
          <p className="body-subheader">
            Trusted by many people, Hedge Hogg is a secure wallet making the
            world of web3 accessible to all.
          </p>
          <div className="body-content" />
        </div>
        <div className="card-footer col gap-4">
          <div
            className="btn btn-primary flex justify-center items-center"
            onClick={() => {
              appDispatch(
                updateOnboardingStatus({
                  status: OnboardingStatus.INITIALIZED,
                  type: OnboardingStatus.BY_CREATE,
                })
              );

              navigate(ONBOARDING_CREATE_PASSWORD_ROUTE, {
                state: ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
              });
            }}
          >
            Create a new wallet
          </div>
          <div
            className="btn btn-secondary flex justify-center items-center"
            onClick={() => {
              appDispatch(
                updateOnboardingStatus({
                  status: OnboardingStatus.INITIALIZED,
                  type: OnboardingStatus.BY_IMPORT,
                })
              );

              navigate(ONBOARDING_CREATE_PASSWORD_ROUTE, {
                state: ONBOARDING_IMPORT_WITH_SRP_ROUTE,
              });
            }}
          >
            Import an existing wallet
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
