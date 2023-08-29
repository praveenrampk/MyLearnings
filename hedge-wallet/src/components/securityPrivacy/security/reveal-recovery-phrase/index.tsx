import QRCode from 'qrcode.react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '@src/components/loader';
import { LOCK_ROUTE, ONBOARDING_ROUTE } from '@src/helpers/constants/routes';
import { RevealSecretPhraseProps } from '@src/interfaces-and-types/advanced';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { homeSelectors } from '@src/pages/home/homeSlice';
import {
  fetchOnboardingState,
  onboardingSelectors,
} from '@src/pages/onboarding-flow/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { copyToClipboard } from '@src/services/utils';

const RevealSecretPhrase: FC<RevealSecretPhraseProps> = ({ showPopups }) => {
  const [loading, setLoading] = useState(true);
  const [isPhraseViewed, setPhraseViewed] = useState(false);
  const [password, setPassword] = useState('');
  const [copy, setCopy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Text');
  const appDispatch = useAppDispatch();
  const onboardingState = useAppSelector(onboardingSelectors);
  const homeState = useAppSelector(homeSelectors);
  const navigate = useNavigate();

  const fetchSettings = useCallback(async () => {
    try {
      await appDispatch(fetchOnboardingState()).unwrap();
      setLoading(false);
      if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED)
        navigate(ONBOARDING_ROUTE);
      else if (!homeState.isLogedIn) navigate(LOCK_ROUTE);
    } catch (err) {
      setLoading(false);
    }
  }, [appDispatch, setLoading, navigate, fetchOnboardingState]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleOnkeyDownOrView = async () => {
    await appDispatch(fetchOnboardingState()).unwrap();

    if (password === onboardingState.password.password) {
      setPhraseViewed(true);
    } else {
      setErrorMsg('Incorrect password');
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="fixed inset-0 flex items-center justify-center z-50 cursor-default">
      <div className="fixed inset-0 bg-white-75 dark:bg-black opacity-50"></div>
      <div className="revealPhraseModal">
        <div className="flex flex-col p-4 space-y-4 justify-between flex-1">
          <div className="space-y-4">
            <div className="flex flex-col gap-y-3">
              <p className="text-2xl text-center text-black-10 dark:text-white-75 font-extrabold">
                Secret Recovery Phrase
              </p>
              <div className="flex flex-col space-y-3">
                <p className="text-base text-black-10 dark:text-white-65">
                  {`Your wallet and funds are completely accessible via the Secret Recovery Phrase (SRP).`}
                </p>
                <p className="text-base text-black-10 dark:text-white-65">
                  {`Hedge Hogg is a non-custodial wallet. That means you're the owner of your SRP.`}
                </p>
              </div>
            </div>
            <div className="h-24 w-full border border-red rounded-md">
              <p className="p-2 text-red text-base">
                Verify that nobody is staring at your screen. Never will Hedge
                Hogg Support make such a request.
              </p>
            </div>
            {!isPhraseViewed ? (
              <div className="space-y-2">
                <p className="dark:text-white-75 text-black-10 text-base">
                  Enter the Password to continue
                </p>
                <div className="bg-transparent border dark:border-white-10 border-black-10 rounded-md h-12 w-full space-y-2">
                  <input
                    className="h-full w-full p-3 bg-transparent text-lg dark:text-white-75 text-black-10"
                    type="password"
                    placeholder="Ensure that no one is watching"
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleOnkeyDownOrView()
                    }
                    onChange={(e) => (
                      setPassword(e.target.value), setErrorMsg(null)
                    )}
                  />
                </div>
                <p className="text-red text-sm">{errorMsg}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <>
                  <div className="w-full h-full flex flex-row justify-between">
                    <div
                      className={`w-1/2 border-b-2 ${
                        activeTab === 'Text'
                          ? 'border-b-primary'
                          : 'border-b-white-5'
                      } hover:bg-white-10 hover:cursor-pointer`}
                      onClick={() => setActiveTab('Text')}
                    >
                      <div className="text-lg text-white-75 text-center">
                        Text
                      </div>
                    </div>
                    <div
                      className={`w-1/2 border-b-2 ${
                        activeTab === 'QR'
                          ? 'border-b-primary'
                          : 'border-b-white-5'
                      } hover:bg-white-10 hover:cursor-pointer`}
                      onClick={() => setActiveTab('QR')}
                    >
                      <div className="text-lg text-white-75 text-center">
                        QR
                      </div>
                    </div>
                  </div>
                </>
                {activeTab === 'Text' ? (
                  <div className="space-y-2">
                    <p className="text-sm dark:text-white-75 text-black-10">
                      Your Secret Recovery Phrase
                    </p>
                    <div className="h-44 p-2 w-full border border-white-10 rounded-md space-y-4 flex flex-col justify-between flex-1">
                      <p className="p-2  dark:text-white-75 text-black-10 text-lg font-semibold">
                        {onboardingState.secretPhrase.phrase.mnemonics}
                      </p>
                      <div
                        className="w-full p-3 text-sm border text-center border-primary rounded-3xl cursor-pointer hover:bg-primary hover:text-black-10"
                        onClick={() => (
                          setCopy(true),
                          copyToClipboard(
                            onboardingState.secretPhrase.phrase.mnemonics
                          ),
                          setTimeout(() => setCopy(false), 5000)
                        )}
                      >
                        {copy ? 'Copied.' : 'Copy to Clipboard'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <QRCode
                    value={onboardingState.secretPhrase.phrase.mnemonics}
                    size={200}
                    style={{ marginTop: 50, marginLeft: 130 }}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {!isPhraseViewed ? (
              <div className="flex flex-row p-2 justify-between">
                <div
                  className="w-40 py-4 text-sm text-primary text-center bg-transparent border border-primary rounded-3xl cursor-pointer"
                  onClick={() => (setPhraseViewed(false), showPopups(false))}
                >
                  Cancel
                </div>
                <div
                  className="w-40 py-4 text-sm bg-red border text-center border-red rounded-3xl cursor-pointer"
                  onClick={() => handleOnkeyDownOrView()}
                >
                  View
                </div>
              </div>
            ) : (
              <div
                className="w-full py-4 text-sm border text-center border-primary rounded-3xl cursor-pointer hover:bg-primary hover:text-black-10"
                onClick={() => setPhraseViewed(false)}
              >
                Close
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevealSecretPhrase;
