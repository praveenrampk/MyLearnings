import { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
  updatePasswordInOnboardingState,
  validatePassword,
} from '@src/helpers';
import { ChangePasswordProps } from '@src/interfaces-and-types/advanced';
import {
  alterInOnboardingState,
  fetchOnboardingState,
  onboardingSelectors,
} from '@src/pages/onboarding-flow/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';

import Loader from '../../../loader';

const ChangeWalletPassword: FC<ChangePasswordProps> = ({ showPopups }) => {
  const appDispatch = useAppDispatch();
  const onboardingState = useAppSelector(onboardingSelectors);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsgCurr, setErrMsgCurr] = useState<string | null>(null);
  const [errorMsgPas, setErrMsgPas] = useState<string | null>(null);
  const [errorMsgCPas, setErrMsgCPas] = useState<string | null>(null);
  const [timer1, setTimer1] = useState(null);
  const [timer2, setTimer2] = useState(null);
  const [timer3, setTimer3] = useState(null);
  const deleteRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      showPopups(false);
    }
  };

  const getSettingsState = useCallback(async () => {
    try {
      await appDispatch(fetchOnboardingState()).unwrap();
    } catch (err) {
      null;
    }
  }, [appDispatch]);

  useEffect(() => {
    getSettingsState();
    document.addEventListener('mousedown', (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e));
    };
  }, [getSettingsState]);

  useEffect(() => {
    clearTimeout(timer1);
    setErrMsgCurr(null);

    const newTimer = setTimeout(() => {
      if (
        currentPassword.length &&
        currentPassword !== onboardingState.password.password
      ) {
        setErrMsgCurr('Incorrect Password');
      } else {
        setErrMsgCurr(null);
      }
    }, 1000);
    setTimer1(newTimer);
  }, [currentPassword]);

  useEffect(() => {
    clearTimeout(timer2);
    setErrMsgPas(null);
    setErrMsgCPas(null);

    const newTimer = setTimeout(() => {
      if (password.length) {
        if (password !== onboardingState.password.password) {
          validatePassword(password)
            ? setErrMsgPas(null)
            : setErrMsgPas('Strictly Use Strong Password');
        } else {
          setErrMsgPas("Don't use the same password");
        }
      } else {
        setErrMsgPas(null);
      }
    }, 1000);
    setTimer2(newTimer);
  }, [password, confirmPassword]);

  useEffect(() => {
    clearTimeout(timer3);
    setErrMsgPas(null);
    setErrMsgCPas(null);

    const newTimer = setTimeout(() => {
      if (confirmPassword.length) {
        confirmPassword !== password
          ? setErrMsgCPas('Password not matches')
          : setErrMsgCPas(null);
      } else {
        setErrMsgCPas(null);
      }
    }, 1000);
    setTimer3(newTimer);
  }, [password, confirmPassword]);

  const changePassword = async () => {
    try {
      if (!errorMsgCurr && !errorMsgPas && !errorMsgCPas) {
        if (
          currentPassword.length &&
          password.length &&
          confirmPassword.length
        ) {
          setLoading(true);

          await appDispatch(
            alterInOnboardingState(
              updatePasswordInOnboardingState(onboardingState, password)
            )
          ).unwrap();
          showPopups(false);
          setLoading(false);
        }
      }
    } catch (err) {
      null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
      <div className="fixed inset-0 bg-white-75 dark:bg-black opacity-50"></div>
      <div ref={deleteRef} className="modal">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col mt-5 justify-center items-center space-y-8">
              <p className="text-2xl text-black-10 dark:text-white-75 font-semibold">
                Change Password
              </p>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                  <p
                    className={`text-base ${
                      errorMsgCurr ? 'text-red' : 'text-white-75'
                    } text-black-10`}
                  >
                    {errorMsgCurr === null
                      ? 'Current Hedge Hogg Password'
                      : errorMsgCurr}
                  </p>
                  <div className="bg-transparent border dark:border-white-10 border-black-10 rounded-md h-12 w-full space-y-2">
                    <input
                      className="h-full w-full p-2 bg-transparent text-lg dark:text-white-75 text-black-10"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-base dark:text-white-75 text-black-10"></p>
                  <p
                    className={`text-base ${
                      errorMsgPas ? 'text-red' : 'text-white-75'
                    } text-black-10`}
                  >
                    {errorMsgPas === null
                      ? 'New Hedge Hogg Password'
                      : errorMsgPas}
                  </p>
                  <div className="bg-transparent border dark:border-white-10 border-black-10 rounded-md h-12 w-full space-y-2">
                    <input
                      className="h-full w-full p-2 bg-transparent text-lg dark:text-white-75 text-black-10"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="text-sm dark:text-white-65 text-black-10">
                    {`Atleast 8 character and 1 number`}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <p
                    className={`text-base ${
                      errorMsgCPas ? 'text-red' : 'text-white-75'
                    } text-black-10`}
                  >
                    {errorMsgCPas === null
                      ? 'Confirm New Hedge Hogg Password'
                      : errorMsgCPas}
                  </p>
                  <div className="bg-transparent border dark:border-white-10 border-black-10 rounded-md h-12 w-full space-y-2">
                    <input
                      className="h-full w-full p-2 bg-transparent text-lg dark:text-white-75 text-black-10"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row p-2 justify-evenly">
                <div
                  className="w-40 py-4 text-sm text-primary text-center bg-transparent border border-primary rounded-3xl cursor-pointer"
                  onClick={() => showPopups(false)}
                >
                  Back
                </div>
                <div
                  className="w-40 py-4 text-sm dark:text-black text-white-75 bg-primary border text-center border-primary rounded-3xl cursor-pointer"
                  onClick={() => changePassword()}
                >
                  Change
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeWalletPassword;
