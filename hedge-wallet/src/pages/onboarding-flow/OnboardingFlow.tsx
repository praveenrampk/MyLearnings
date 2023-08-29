import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DEFAULT_ROUTE,
  ONBOARDING_CONFIRM_SRP_ROUTE,
  ONBOARDING_CREATE_PASSWORD_ROUTE,
  ONBOARDING_IMPORT_WITH_SRP_ROUTE,
  ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
  ONBOARDING_WELCOME_ROUTE,
} from '@src/helpers/constants/routes';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import { fetchOnboardingState, onboardingSelectors } from './onboardingSlice';

import '@styles/global.scss';

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const onboardingState = useAppSelector(onboardingSelectors);
  const appDispatch = useAppDispatch();

  const navigateTo = (route: string) => {
    const isPopupOpen = chrome.extension.getViews({ type: 'popup' }).length > 0;

    if (isPopupOpen) {
      window.open(
        `chrome-extension://${chrome.runtime.id}/src/popup.html#${route}`,
        '_blank'
      );
    } else navigate(route);
  };

  const checkOnboardingStatus = useCallback(async () => {
    await appDispatch(fetchOnboardingState()).unwrap();

    switch (onboardingState.onboardingStatus) {
      case OnboardingStatus.ONBOARD:
        navigateTo(ONBOARDING_WELCOME_ROUTE);
        break;
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
        navigateTo(ONBOARDING_CONFIRM_SRP_ROUTE);
        break;
      case OnboardingStatus.COMPLETED:
        navigate(DEFAULT_ROUTE);
        break;
      default:
        break;
    }
  }, [appDispatch]);

  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  return <div className="onboarding-flow" />;
};

export default OnboardingFlow;
