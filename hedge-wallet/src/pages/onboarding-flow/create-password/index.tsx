import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Hide, View } from '@src/assets/img';
import { validatePassword } from '@src/helpers';
import {
  LOCK_ROUTE,
  ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
} from '@src/helpers/constants/routes';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import {
  onboardingSelectors,
  updateOnboardingPassword,
} from '../onboardingSlice';

import '@styles/global.scss';

const OnboardingCreatePassword = () => {
  const [password, setPassword] = useState<string>('');
  const [cPassword, setCPassword] = useState<string>('');
  const [viewkey, setViewKey] = useState<boolean[]>(Array(2).fill(true));
  const [check, setCheck] = useState<boolean>(false);
  const navigate = useNavigate();
  const onboardingState = useAppSelector(onboardingSelectors);
  const nextRoute = useLocation().state;

  const appDispatch = useAppDispatch();

  const isPasswordMatched =
    password.length < 8 ||
    password !== cPassword ||
    !validatePassword(password) ||
    !check;

  useEffect(() => {
    if (onboardingState.password.password) {
      navigate(LOCK_ROUTE);
    }
  }, []);

  return (
    <div className="onboarding-container">
      <div className="card-container p-4">
        <div className="card-header">
          <div className="stepper flex w-full justify-evenly items-center text-sm">
            <div className="step active flex gap-2">
              <div className="pointer">1</div>
              <span className="flex justify-center items-center">
                Create Password
              </span>
            </div>
            {nextRoute === ONBOARDING_SECURE_YOUR_WALLET_ROUTE ? (
              <>
                <div className="step flex gap-2">
                  <div className="pointer">2</div>
                  <span className="flex justify-center items-center">
                    Secure Wallet
                  </span>
                </div>
                <div className="step flex gap-2">
                  <div className="pointer">3</div>
                  <span className="flex justify-center items-center">
                    Confirmation
                  </span>
                </div>
              </>
            ) : (
              <div className="step flex gap-2">
                <div className="pointer">2</div>
                <span className="flex justify-center items-center">
                  Confirm Secret recovery phrase
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-header">Create Password</div>
          <p className="body-subheader">
            This password will unlock your HedgeHogg wallet only on this device.
            HedgeHogg cannot recover this password.
          </p>
          <div className="body-content items-center gap-4">
            <div className="password-container flex flex-col h-auto gap-2">
              <div className="placeholder text-sm"></div>
              <div className="placeholder text-sm">New Password</div>
              <div
                className="input-container"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  className="password-input h-full w-10/12 text-lg p-2"
                  style={{
                    marginRight: '10px',
                  }}
                  placeholder="Spider$05"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={viewkey[0] ? 'password' : 'text'}
                />
                <div className="input-validation text-xs">
                  <img
                    className="cursor-pointer"
                    src={viewkey[0] ? Hide : View}
                    onClick={() => setViewKey([!viewkey[0], viewkey[1]])}
                  />
                </div>
              </div>
              <div
                className="input-validation text-xs"
                style={
                  validatePassword(password) ? { color: 'greenyellow' } : {}
                }
              >
                {validatePassword(password)
                  ? '✅ Great! Strong Password'
                  : 'At least 8 characters and 1 number'}
              </div>
            </div>
            <div className="password-container flex flex-col h-auto gap-2">
              <div className="placeholder text-sm"></div>
              <div
                className="placeholder text-sm"
                style={
                  password !== cPassword && password.length <= cPassword.length
                    ? { color: 'red' }
                    : {}
                }
              >
                {password !== cPassword && password.length <= cPassword.length
                  ? 'Password not Matched'
                  : 'Confirm Password'}
              </div>
              <div
                className="input-container"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  className="password-input h-full w-10/12 text-lg p-2"
                  style={{
                    marginRight: '10px',
                  }}
                  placeholder="Spider$05"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  type={viewkey[1] ? 'password' : 'text'}
                />
                <div className="input-validation text-xs">
                  <img
                    className="cursor-pointer"
                    src={viewkey[1] ? Hide : View}
                    onClick={() => setViewKey([viewkey[0], !viewkey[1]])}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="agreement flex items-center gap-4 ps-8">
            <input
              type="checkbox"
              className="h-6 w-6"
              checked={check}
              onClick={() => setCheck(!check)}
            />
            <p className="content text-sm">
              I understand that HedgeHogg cannot recover this password for me.
              <span>
                {' '}
                <a href="">Learn more</a>
              </span>
            </p>
          </div>
        </div>
        <div className="card-footer col">
          <button
            className="btn btn-primary flex justify-center items-center"
            style={{ backgroundColor: isPasswordMatched && 'white' }}
            disabled={isPasswordMatched}
            onClick={async () => {
              await appDispatch(
                updateOnboardingPassword({
                  setPassword: {
                    password,
                    isAgreement: true,
                  },
                  status: nextRoute === ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
                })
              ).unwrap();
              navigate(nextRoute);
            }}
          >
            {nextRoute === ONBOARDING_SECURE_YOUR_WALLET_ROUTE
              ? 'Create a new wallet'
              : 'Import an existing wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCreatePassword;
