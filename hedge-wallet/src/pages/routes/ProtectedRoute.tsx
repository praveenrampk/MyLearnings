import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ONBOARDING_ROUTE } from '@src/helpers/constants/routes';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { useAppSelector } from '@src/redux/store';

import { onboardingSelectors } from '../onboarding-flow/onboardingSlice';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { onboardingStatus } = useAppSelector(onboardingSelectors);
  if (onboardingStatus === OnboardingStatus.COMPLETED) {
    return children;
  } else return <Navigate to={ONBOARDING_ROUTE} />;
};
