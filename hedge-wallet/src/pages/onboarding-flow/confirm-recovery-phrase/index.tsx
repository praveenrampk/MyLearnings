import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DEFAULT_ROUTE,
  ONBOARDING_COMPLETION_ROUTE,
} from '@src/helpers/constants/routes';
import {
  OnboardingStatus,
  PhraseProps,
} from '@src/interfaces-and-types/onboarding-flow';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { initialFirstAccount } from '@src/services/crypto';
import { shuffleThatSeeds } from '@src/services/utils';

import { completeOnboarding, onboardingSelectors } from '../onboardingSlice';

import '@styles/global.scss';

const OnboardingConfirmSRP = () => {
  const [seeds, setSeeds] = useState<PhraseProps[]>([]);

  const [cSeeds, setCSeeds] = useState<PhraseProps[]>(
    new Array(12).fill({ phrase: '', isClicked: false })
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const onboardingState = useAppSelector(onboardingSelectors);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (
      onboardingState &&
      onboardingState.onboardingStatus !== OnboardingStatus.SRP_CREATED
    ) {
      navigate(DEFAULT_ROUTE);
    } else {
      const initialSeeds = shuffleThatSeeds(
        onboardingState.secretPhrase.phrase.mnemonics.split(' ')
      ).map((word) => ({
        phrase: word,
        isClicked: false,
      }));

      setSeeds(initialSeeds);
    }
  }, []);

  const validateSRP = async () => {
    const originalPhrases =
      onboardingState.secretPhrase.phrase.mnemonics.split(' ');

    const isPhrasesMatched = originalPhrases.filter(
      (word, index) => word === cSeeds[index].phrase
    );

    const whiteSpaceIndex = cSeeds.findIndex((seed) => seed.phrase === '');

    if (whiteSpaceIndex === -1) {
      if (isPhrasesMatched.length === originalPhrases.length) {
        const accountDetails = await initialFirstAccount(
          onboardingState.secretPhrase.phrase.mnemonics,
          onboardingState.password.password,
          0
        );
        await appDispatch(completeOnboarding(accountDetails)).unwrap();
        navigate(ONBOARDING_COMPLETION_ROUTE);

        return;
      }
      setErrorMessage('Phrases Not Matched');

      return;
    }

    whiteSpaceIndex
      ? setErrorMessage('select all the phrases')
      : setErrorMessage('select the phrases');

    return;
  };

  const handleUnToggle = (word: PhraseProps) => {
    if (word.phrase.length) {
      const phrases = [...cSeeds];

      phrases.splice(
        phrases.findIndex((obj) => obj.phrase === word.phrase),
        1
      );
      phrases.push({ phrase: '', isClicked: false });

      const toggledPhrase = seeds.map((seed) => {
        if (seed.phrase === word.phrase) {
          return { phrase: seed.phrase, isClicked: !seed.isClicked };
        }

        return seed;
      });

      setCSeeds([...phrases]);
      setSeeds([...toggledPhrase]);
      setErrorMessage(null);
    }
  };

  const handleToggle = (word: PhraseProps) => {
    const phrases = seeds.map((seed) => {
      if (seed.phrase === word.phrase) {
        let index = 0;
        const phraseArray = [...cSeeds];

        while (phraseArray[index].phrase) {
          index++;
        }

        phraseArray[index] = { ...word, isClicked: !word.isClicked };
        setCSeeds([...phraseArray]);

        return { phrase: seed.phrase, isClicked: !seed.isClicked };
      }

      return seed;
    });

    setSeeds(phrases);
    setErrorMessage(null);
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
              <div className="pointer">✓</div>
              <span className="flex justify-center items-center">
                Secure Wallet
              </span>
            </div>
            <div className="step active flex gap-2">
              <div className="pointer">3</div>
              <span className="flex justify-center items-center">
                Confirmation
              </span>
            </div>
          </div>
        </div>
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-header">Confirm your secret phrase</div>
          <p className="body-subheader">
            Please select each word in the correct order to verify you have
            saved your secret phrase.
          </p>
          <p className="text-center text-red text-sm">{errorMessage}</p>
          <div className="body-content items-center gap-4 phrases-container">
            <div className="secret-phrase-confirm w-full h-52 flex flex-col items-center justify-start p-4 phrases-container">
              {cSeeds &&
                cSeeds.map((seed: PhraseProps, index: number) => {
                  return (
                    <span
                      key={`${seed.phrase}-${index}`}
                      className="cursor-pointer phrase"
                      style={
                        seed.isClicked
                          ? {
                              backgroundColor: 'rgba(255, 198, 77, 0.25)',
                              color: '#FFC64D',
                            }
                          : {
                              border: '1px dashed rgba(255, 198, 77, 0.45)',
                              backgroundColor: 'transparent',
                            }
                      }
                      onClick={() => handleUnToggle(seed)}
                    >
                      {`${seed.phrase ?? ''}`}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="body-content items-center gap-4 phrases-container">
            <div className="secret-phrase-confirm w-full h-52 flex flex-col items-center justify-start p-4 phrases-container">
              {seeds &&
                seeds.map((seed: PhraseProps, index) => {
                  return (
                    <span
                      key={`${seed.phrase}-${index}`}
                      className="cursor-pointer phrase"
                      style={
                        seed.isClicked
                          ? {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: 'rgba(255, 255, 255, 0.25)',
                            }
                          : {}
                      }
                      onClick={() => !seed.isClicked && handleToggle(seed)}
                    >
                      {`${seed.phrase}`}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="card-footer end">
          <button
            className="btn-primary flex justify-center items-center  w-auto p-2 px-4 rounded-lg"
            onClick={() => validateSRP()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingConfirmSRP;
