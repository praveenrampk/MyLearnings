import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Hide, View } from '@src/assets/img';
import {
  ONBOARDING_CONFIRM_SRP_ROUTE,
  DEFAULT_ROUTE,
} from '@src/helpers/constants/routes';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { createSeedPhrases } from '@src/services/crypto';
import { copyToClipboard, downloadFile } from '@src/services/utils';

import {
  fetchOnboardingState,
  onboardingSelectors,
  putMnemonicsInOnboardingState,
  updateOnboardingSRP,
} from '../onboardingSlice';

import '@styles/global.scss';

const OnboardingSecureYourWallet = () => {
  const onboardingState = useAppSelector(onboardingSelectors);
  const appDispatch = useAppDispatch();

  const [SRP, setSRP] = useState<string>(
    onboardingState.secretPhrase.isScreenBlur
      ? createSeedPhrases(false)
      : onboardingState.secretPhrase.phrase.mnemonics
  );
  const [copied, setCopied] = useState<boolean>(false);

  const [viewSRP, setViewSRP] = useState<boolean>(
    onboardingState.secretPhrase.isScreenBlur
  );
  const navigate = useNavigate();

  const getOnboardingState = async () => {
    await appDispatch(fetchOnboardingState()).unwrap();

    if (
      onboardingState &&
      onboardingState.onboardingStatus !== OnboardingStatus.CREATE_PASSWORD
    ) {
      navigate(DEFAULT_ROUTE);
    } else {
      if (onboardingState.secretPhrase.isScreenBlur) {
        const phrase = createSeedPhrases(true);

        await appDispatch(
          updateOnboardingSRP({
            phrase: { mnemonics: phrase, masterKey: null },
            isScreenBlur: false,
            isSRPVerified: false,
            isSRPViewed: false,
          })
        ).unwrap();
        setSRP(phrase);
        setViewSRP(false);
      } else {
        setSRP(onboardingState.secretPhrase.phrase.mnemonics);
        setViewSRP(false);
      }
    }
  };

  const proceedNext = async () => {
    await appDispatch(
      updateOnboardingSRP({
        phrase: { mnemonics: SRP, masterKey: null },
        isSRPVerified: false,
        isSRPViewed: true,
        isScreenBlur: false,
      })
    ).unwrap();
    await appDispatch(putMnemonicsInOnboardingState(SRP)).unwrap();
  };

  return (
    <div className="onboarding-container">
      <div className="card-container p-4">
        <div className="card-header">
          <div className="stepper flex w-full justify-evenly items-center text-sm">
            <div className="step active flex gap-2">
              <div className="pointer">✓</div>
              <span className="flex justify-center items-center">
                Create Password
              </span>
            </div>
            <div className="step active flex gap-2">
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
          </div>
        </div>
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-header">Secret Recovery Phrase</div>
          <p className="body-subheader">
            You will be shown a secret phase on the next screen. It allow you to
            recover your wallet even if you lose your device or forget your
            password.
          </p>
          <div className="body-content items-center gap-4">
            <div
              className="secret-phrase-container"
              title={viewSRP ? 'Click here, To view the phrase' : ''}
              onClick={() => viewSRP && getOnboardingState()}
            >
              <p
                className={`text-center text-3xl ${viewSRP ? 'blur-sm' : ''}`}
                style={viewSRP ? { userSelect: 'none' } : {}}
              >
                {SRP}
              </p>
              {viewSRP && (
                <>
                  <img className="h-10 w-10 eye-icon" src={View} />
                  <p
                    className="eye-icon body-header"
                    style={{ right: 600, top: 480, fontWeight: 'bold' }}
                  >
                    Reveal Secret Recovery Phrase
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="card-footer end">
          <button
            className="btn-primary flex justify-center items-center  w-auto p-2 px-4 rounded-lg"
            onClick={async () => {
              await proceedNext();
              navigate(ONBOARDING_CONFIRM_SRP_ROUTE);
            }}
          >
            Proceed Next
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="btn-primary flex justify-center items-center w-auto p-2 px-4"
            onClick={() =>
              downloadFile(SRP.split(' '), 'Secret recovery-phrases.txt')
            }
          >
            Download
          </button>
          {' .'}
          <button
            className="btn-primary flex justify-center items-center w-auto p-2 px-4"
            title="copy to clipboard"
            onClick={() => {
              copyToClipboard(SRP);
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {copied ? 'Copied.' : 'Copy'}
          </button>
          {' .'}
          {!viewSRP && (
            <img
              className="btn-primary flex justify-center items-center w-auto p-2 px-4 cursor-pointer"
              style={{ color: 'black' }}
              title="Hide Phrase"
              src={Hide}
              onClick={() => setViewSRP(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSecureYourWallet;
