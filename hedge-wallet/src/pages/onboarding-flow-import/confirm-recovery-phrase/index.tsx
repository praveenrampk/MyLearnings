import * as bip39 from 'bip39';
import { ChangeEvent, ClipboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Info } from '@src/assets/img';
import { ONBOARDING_COMPLETION_ROUTE } from '@src/helpers/constants/routes';
import {
  completeOnboarding,
  onboardingSelectors,
  putMnemonicsInOnboardingState,
} from '@src/pages/onboarding-flow/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { initialFirstAccount } from '@src/services/crypto';

import '@styles/global.scss';

enum DropDownValues {
  WORD_12 = '12_PHRASE_WORD',
  WORD_15 = '15_PHRASE_WORD',
  WORD_18 = '18_PHRASE_WORD',
  WORD_21 = '21_PHRASE_WORD',
  WORD_24 = '24_PHRASE_WORD',
}

const wordSizes = [12, 15, 18, 21, 24];

const OnboardingConfirmRecoveryPhrase = () => {
  const [wordSize, setWordSize] = useState(12);

  const [inputs, setInputs] = useState(
    Array.from({ length: wordSize }, () => '')
  );
  const [selectedValue, setSelectedValue] = useState('');
  const [errorMessage, errorMessageSetter] = useState<null | string>(null);
  const navigate = useNavigate();
  const onboardingState = useAppSelector(onboardingSelectors);

  const appDispatch = useAppDispatch();

  useEffect(() => {
    inputs.length > wordSize
      ? (inputs.splice(-1 * (inputs.length - wordSize)), setInputs(inputs))
      : setInputs([
          ...inputs,
          ...Array.from({ length: wordSize - inputs.length }, () => ''),
        ]);
  }, [selectedValue]);

  useEffect(() => {
    !inputs.includes('') && !bip39.validateMnemonic(inputs.join(' '))
      ? errorMessageSetter('Invalid Mnemonic')
      : errorMessageSetter(null);
  }, [inputs]);

  const handleDropDown = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    setSelectedValue(e.target.value);

    const newWordSize = Number(e.target.value.split('_')[0]);

    if (newWordSize < wordSize) {
      setInputs(inputs.slice(0, newWordSize));
    }

    setWordSize(newWordSize);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    e.preventDefault();
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);
  };

  const inputValidation = (text: string[]): boolean => {
    const validate = inputs.findIndex((word) => word === '');

    if (wordSizes.includes(text.length)) {
      errorMessageSetter(null);

      return false;
    }

    if (validate) {
      return true;
    }

    if (wordSizes.findIndex((size) => size === text.length) === -1) {
      errorMessageSetter(
        'Secret Recovery Phrases contain 12, 15, 18, 21, or 24 words'
      );
    }

    return false;
  };

  const handleMnemonicPaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const pastedText = e.clipboardData
      .getData('text')
      .replace(/\n/g, '')
      .trim()
      .split(' ')
      .filter((str) => str !== '');

    const size = pastedText.length;

    if (!size) {
      return;
    }

    if (size > 24) {
      errorMessageSetter(
        'Paste failed because it contained over 24 words. A secret recovery phrase can have a maximum of 24 words.'
      );

      return;
    }

    if (!inputValidation(pastedText)) {
      setInputs(size ? pastedText : inputs);

      let selectedSize = wordSizes.findIndex((value) => size <= value);
      selectedSize = selectedSize === -1 ? 24 : wordSizes[selectedSize];

      setWordSize(selectedSize);
      setSelectedValue(DropDownValues[`WORD_${selectedSize}`]);
    }
  };

  const importWallet = async () => {
    await appDispatch(putMnemonicsInOnboardingState(inputs.join(' '))).unwrap();

    await appDispatch(
      completeOnboarding(
        await initialFirstAccount(
          inputs.join(' '),
          onboardingState.password.password,
          0
        )
      )
    ).unwrap();
    navigate(ONBOARDING_COMPLETION_ROUTE);

    return;
  };

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
            <div className="step active flex gap-2">
              <div className="pointer">2</div>
              <span className="flex justify-center items-center">
                Confirm Secret recovery phrase
              </span>
            </div>
          </div>
        </div>
        <div className="card-body h-auto p-4 space-y-4">
          <div className="body-header">
            Access your wallet with your Secret Recovery Phrase
          </div>
          <p className="body-subheader">
            Hedge Hogg cannot recover your password. We will use your Secret
            Recovery Phrase to validate your ownership, restore your wallet and
            set up a new password. First, enter the Secret Recovery Phrase that
            you were given when you created your wallet.
            <span>
              {' '}
              <a href="">Learn more</a>
            </span>
          </p>
        </div>
        <div className="flex px-2 py-10 justify-between">
          <p className="text-white-75 text-base font-bold">
            Type your Secret Recovery Phrase
          </p>
          <select
            className="border border-white-85 bg-black-10 text-white-75 h-full w-100 p-2 rounded-md text-base cursor-pointer"
            id="dropdown"
            value={selectedValue}
            onChange={(e) => handleDropDown(e)}
          >
            <option value={DropDownValues.WORD_12}>
              I have a 12-word phrase
            </option>
            <option value={DropDownValues.WORD_15}>
              I have a 15-word phrase
            </option>
            <option value={DropDownValues.WORD_18}>
              I have a 18-word phrase
            </option>
            <option value={DropDownValues.WORD_21}>
              I have a 21-word phrase
            </option>
            <option value={DropDownValues.WORD_24}>
              I have a 24-word phrase
            </option>
          </select>
        </div>
        <div className="px-16 py-5">
          <div className="flex gap-1 border border-white-85 h-10 w-96 px-2 py-2 rounded-md">
            <img className="h-4 w-4" src={Info} />
            <p className="text-white-75 text-center">
              You can paste your entire secret recovery phrase into any field
            </p>
          </div>
        </div>
        <div className="p-4">
          <label className="grid grid-cols-3 grid-rows-4 gap-5">
            {inputs.map((value, index) => (
              <div
                className={`flex ${index + 1 < 10 ? 'gap-3' : 'gap-1'}`}
                key={index + 1}
              >
                <p className="text-white-75 text-base">{index + 1}.</p>
                <input
                  className="border border-white-85 text-base text-white-75 bg-transparent h-10 w-28 px-2 rounded-md"
                  value={value}
                  onPaste={(e) => handleMnemonicPaste(e)}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            ))}
          </label>
        </div>
        {errorMessage && (
          <div className="px-16 py-7">
            <div className="gap-1 border border-red h-1/3 w-96 p-2 rounded-md">
              <div className="flex">
                <img className="h-4 w-4" src={Info} />
                <p className="text-red text-center">{errorMessage}</p>
              </div>
              <div
                className="h-5 w-14 bg-red text-white-85 text-center cursor-pointer font-bold rounded-md ml-auto"
                onClick={() => errorMessageSetter(null)}
              >
                Dismiss
              </div>
            </div>
          </div>
        )}
        <div className="card-footer col">
          <button
            className={`btn btn-primary flex justify-center items-center ${
              errorMessage && 'opacity-60'
            }`}
            onClick={() => {
              !errorMessage && importWallet();
            }}
          >
            Confirm Secret Recovery Phrase
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingConfirmRecoveryPhrase;
